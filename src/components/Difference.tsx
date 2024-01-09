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
import difference from "@turf/difference";
import { Polygon, MultiPolygon } from "geojson";

const Difference: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedLayer1, setSelectedLayer1] = useState<string>("");
  const [selectedLayer2, setSelectedLayer2] = useState<string>("");
  const [newLayerName, setNewLayerName] = useState<string>("");
  const { layers, addLayer } = useFiles();

  const handleDifference = useCallback(() => {
    const layer1 = layers.find((layer) => layer.name === selectedLayer1);
    const layer2 = layers.find((layer) => layer.name === selectedLayer2);

    if (!layer1 || !layer2) {
      console.error("Both layers must be selected.");
      return;
    }

    const differenceFeatures = layer1.data.features
      .map((feature1) => {
        const diffFeature = layer2.data.features.reduce((acc, feature2) => {
          return (
            difference(
              acc.geometry as Polygon | MultiPolygon,
              feature2.geometry as Polygon | MultiPolygon
            ) || acc
          );
        }, feature1);

        return diffFeature;
      })
      .filter((feature) => feature !== null);

    if (differenceFeatures.length) {
      addLayer({
        name:
          newLayerName ||
          `Difference_of_${selectedLayer1}_and_${selectedLayer2}`,
        data: {
          type: "FeatureCollection",
          features: differenceFeatures,
        },
        visible: true,
        style: { color: "brown" },
      });
    } else {
      console.error("No valid differences found.");
    }

    onClose();
  }, [selectedLayer1, selectedLayer2, newLayerName, layers, addLayer, onClose]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Typography variant="h6">Calculate Difference</Typography>
      <Box sx={{ my: 2 }}>
        {/* Choose first layer */}
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Layer 1 (Base Layer)</InputLabel>
          <Select
            value={selectedLayer1}
            onChange={(e) => setSelectedLayer1(e.target.value as string)}
            label="Layer 1 (Base Layer)"
          >
            {layers.map((layer, index) => (
              <MenuItem key={index} value={layer.name}>
                {layer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Choose second layer */}
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Layer 2 (Layer to Subtract)</InputLabel>
          <Select
            value={selectedLayer2}
            onChange={(e) => setSelectedLayer2(e.target.value as string)}
            label="Layer 2 (Layer to Subtract)"
          >
            {layers.map((layer, index) => (
              <MenuItem key={index} value={layer.name}>
                {layer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Input new layer name */}
        <TextField
          label="New Layer Name"
          value={newLayerName}
          onChange={(e) => setNewLayerName(e.target.value)}
          fullWidth
          sx={{ my: 2 }}
        />
      </Box>

      <Button onClick={handleDifference} variant="contained">
        Calculate Difference
      </Button>
    </BaseModal>
  );
};

export default Difference;
