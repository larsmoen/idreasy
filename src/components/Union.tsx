import React, { useState, useCallback } from "react";
import union from "@turf/union";
import booleanIntersects from "@turf/boolean-intersects";
import BaseModal from "./BaseModal";
import {
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useFiles } from "../utils/FileContext";
import { FeatureCollection, Feature, Polygon, MultiPolygon } from "geojson";

const Union: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedLayer1, setSelectedLayer1] = useState<string>("");
  const [selectedLayer2, setSelectedLayer2] = useState<string>("");
  const [newLayerName, setNewLayerName] = useState<string>("union");
  const { layers, addLayer } = useFiles();

  const handleLayer1Change = (event: SelectChangeEvent<string>) => {
    setSelectedLayer1(event.target.value as string);
  };

  const handleLayer2Change = (event: SelectChangeEvent<string>) => {
    setSelectedLayer2(event.target.value as string);
  };

  const handleUnion = useCallback(() => {
    const layer1 = layers.find((layer) => layer.name === selectedLayer1);
    const layer2 = layers.find((layer) => layer.name === selectedLayer2);

    if (!layer1 || !layer2) {
      console.error("Both layers must be selected for the union operation.");
      return;
    }

    const unionFeatureCollection: FeatureCollection = {
      type: "FeatureCollection",
      features: [],
    };

    const isValidPolygonType = (feature: Feature) => {
      return (
        feature.geometry.type === "Polygon" ||
        feature.geometry.type === "MultiPolygon"
      );
    };

    layer1.data.features.forEach((feature1) => {
      layer2.data.features.forEach((feature2) => {
        // if (booleanIntersects(feature1, feature2)) {
        if (isValidPolygonType(feature1) && isValidPolygonType(feature2)) {
          const unionResult = union(
            feature1.geometry as Polygon | MultiPolygon,
            feature2.geometry as Polygon | MultiPolygon
          );
          if (unionResult) {
            unionFeatureCollection.features.push(unionResult);
          }
        }
        // }
      });
    });

    if (unionFeatureCollection.features.length > 0) {
      addLayer({
        name: newLayerName,
        data: unionFeatureCollection,
        visible: true,
        style: { color: "yellow" },
      });
    } else {
      console.error("No intersecting features found for union.");
    }
    onClose();
  }, [selectedLayer1, selectedLayer2, layers, addLayer, onClose, newLayerName]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Union of Layers
      </Typography>
      <Box sx={{ my: 2 }}>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Layer 1</InputLabel>
          <Select
            label="Layer 1"
            value={selectedLayer1}
            onChange={handleLayer1Change}
            displayEmpty
            name="layer1"
          >
            {layers.map((layer, index) => (
              <MenuItem key={index} value={layer.name}>
                {layer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Layer 2</InputLabel>
          <Select
            label="Layer 2"
            value={selectedLayer2}
            onChange={handleLayer2Change}
            displayEmpty
            fullWidth
            name="layer2"
          >
            {layers.map((layer, index) => (
              <MenuItem key={index} value={layer.name}>
                {layer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="New Layer Name"
          variant="outlined"
          value={newLayerName}
          onChange={(e) => setNewLayerName(e.target.value)}
          fullWidth
          sx={{ my: 2 }}
        />
      </Box>
      <Button
        onClick={handleUnion}
        variant="contained"
        style={{ backgroundColor: "#282c34" }}
      >
        Create Union Layer
      </Button>
    </BaseModal>
  );
};

export default Union;
