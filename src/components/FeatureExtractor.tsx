import React, { useState, useCallback, useEffect } from "react";
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
import { FeatureCollection } from "geojson";

const FeatureExtractor: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedLayer, setSelectedLayer] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [newLayerName, setNewLayerName] = useState<string>("");
  const [properties, setProperties] = useState<string[]>([]);
  const [operator, setOperator] = useState<"=" | "<" | ">" | "≠">("=");
  const [value, setValue] = useState<string>("");
  const { layers, addLayer } = useFiles();

  useEffect(() => {
    // Reset property selection when layer changes
    setSelectedProperty("");
    setProperties([]);

    const layer = layers.find((layer) => layer.name === selectedLayer);
    if (layer) {
      // Extract unique property names from features
      const propertyNames = new Set<string>();
      layer.data.features.forEach((feature) => {
        if (!feature.properties) return;
        Object.keys(feature.properties).forEach((prop) =>
          propertyNames.add(prop)
        );
      });
      setProperties(Array.from(propertyNames));
    }
  }, [selectedLayer, layers, newLayerName]);

  const handleExtract = useCallback(() => {
    const layer = layers.find((layer) => layer.name === selectedLayer);
    if (!layer) {
      console.error("Layer not found.");
      return;
    }

    const filteredFeatures = layer.data.features.filter(
      (feature) =>
        feature.properties &&
        evaluateCondition(feature.properties[selectedProperty], operator, value)
    );

    if (filteredFeatures.length) {
      const newFeatureCollection: FeatureCollection = {
        type: "FeatureCollection",
        features: filteredFeatures,
      };

      addLayer({
        name: newLayerName || `${selectedLayer}_extracted`,
        data: newFeatureCollection,
        visible: true,
        style: { color: "green" },
      });
    } else {
      console.error("No features matched the criteria.");
    }

    onClose();
  }, [
    selectedLayer,
    selectedProperty,
    operator,
    value,
    layers,
    addLayer,
    onClose,
  ]);

  // Function to evaluate the condition given for feature extraction
  const evaluateCondition = (
    featureValue: any,
    operator: string,
    inputValue: string
  ) => {
    switch (operator) {
      case "=":
        return featureValue == inputValue;
      case "≠":
        return featureValue != inputValue;
      case "<":
        return featureValue < inputValue;
      case ">":
        return featureValue > inputValue;
      default:
        return false;
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Typography variant="h6">Extract Feature</Typography>
      <Box sx={{ my: 2 }}>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Layer</InputLabel>
          <Select
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(e.target.value as string)}
            label="Layer"
          >
            {layers.map((layer, index) => (
              <MenuItem key={index} value={layer.name}>
                {layer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Property</InputLabel>
          <Select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value as string)}
            label="Property"
          >
            {properties.map((prop, index) => (
              <MenuItem key={index} value={prop}>
                {prop}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Operator</InputLabel>
          <Select
            value={operator}
            onChange={(e) => setOperator(e.target.value as any)}
            label="Operator"
          >
            <MenuItem value="=">=</MenuItem>
            <MenuItem value="≠">≠</MenuItem>
            <MenuItem value="<">{"<"}</MenuItem>
            <MenuItem value=">">{">"}</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
          sx={{ my: 2 }}
        />

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
        onClick={handleExtract}
        variant="contained"
        style={{ backgroundColor: "#282c34" }}
      >
        Extract
      </Button>
    </BaseModal>
  );
};

export default FeatureExtractor;
