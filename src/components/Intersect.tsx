import React, { useState, useCallback } from "react";
import BaseModal, { ModalProps } from "./BaseModal";
import {
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useFiles } from "../utils/FileContext";
import { intersect } from "@turf/turf";
import { Polygon, MultiPolygon } from "geojson";

const Intersect: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedLayer1, setSelectedLayer1] = useState<string>("");
  const [selectedLayer2, setSelectedLayer2] = useState<string>("");
  const [newLayerName, setNewLayerName] = useState<string>("");
  const { layers, addLayer } = useFiles();

  const handleIntersect = useCallback(() => {
    const layer1 = layers.find((layer) => layer.name === selectedLayer1);
    const layer2 = layers.find((layer) => layer.name === selectedLayer2);

    if (!layer1 || !layer2) {
      console.error("Both layers must be selected for the intersection.");
      return;
    }

    const intersectedFeatures: any[] = [];
    layer1.data.features.forEach((feature1) => {
      layer2.data.features.forEach((feature2) => {
        const intersected = intersect(
          feature1.geometry as Polygon | MultiPolygon,
          feature2.geometry as Polygon | MultiPolygon
        );
        if (intersected) {
          intersectedFeatures.push(intersected);
        }
      });
    });

    if (intersectedFeatures.length) {
      addLayer({
        name:
          newLayerName || `intersect_${selectedLayer1}_and_${selectedLayer2}`,
        data: {
          type: "FeatureCollection",
          features: intersectedFeatures,
        },
        visible: true,
        style: { color: "orange" },
      });
    } else {
      console.error("No intersections found.");
    }

    onClose();
  }, [selectedLayer1, selectedLayer2, newLayerName, layers, addLayer, onClose]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Typography variant="h6">Intersect Layers</Typography>
      <Box sx={{ my: 2 }}>
        {/* Layer 1 Selector */}
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Layer 1</InputLabel>
          <Select
            value={selectedLayer1}
            onChange={(e) => setSelectedLayer1(e.target.value as string)}
            label="Layer 1"
          >
            {layers.map((layer, index) => (
              <MenuItem key={index} value={layer.name}>
                {layer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Layer 2 Selector */}
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Layer 2</InputLabel>
          <Select
            value={selectedLayer2}
            onChange={(e) => setSelectedLayer2(e.target.value as string)}
            label="Layer 2"
          >
            {layers.map((layer, index) => (
              <MenuItem key={index} value={layer.name}>
                {layer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Name Input Field */}
        <TextField
          label="New Layer Name"
          value={newLayerName}
          onChange={(e) => setNewLayerName(e.target.value)}
          fullWidth
          sx={{ my: 2 }}
        />
      </Box>

      <Button onClick={handleIntersect} variant="contained">
        Intersect
      </Button>
    </BaseModal>
  );
};

export default Intersect;
