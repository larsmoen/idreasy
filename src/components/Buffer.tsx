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
import { FeatureCollection } from "geojson";
import buffer from "@turf/buffer";

const Buffer: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedLayer, setSelectedLayer] = useState<string>("");
  const [bufferDistance, setBufferDistance] = useState<number>(0);
  const [newLayerName, setNewLayerName] = useState<string>("");
  const { layers, addLayer } = useFiles();

  const handleBuffer = useCallback(() => {
    const layer = layers.find((layer) => layer.name === selectedLayer);
    if (!layer) {
      console.error("Layer not found.");
      return;
    }

    const bufferedFeatures = layer.data.features.map((feature) =>
      buffer(feature, bufferDistance / 1000)
    );

    const newFeatureCollection: FeatureCollection = {
      type: "FeatureCollection",
      features: bufferedFeatures,
    };

    addLayer({
      name: newLayerName || `${selectedLayer}_Buffered`,
      data: newFeatureCollection,
      visible: true,
      style: { color: "purple" },
    });

    onClose();
  }, [selectedLayer, bufferDistance, newLayerName, layers, addLayer, onClose]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Typography variant="h6">Create Buffer</Typography>
      <Box sx={{ my: 2 }}>
        {/* Layer Selector */}
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

        {/* Buffer Distance Input */}
        <TextField
          label="Buffer Distance (meters)"
          type="number"
          value={bufferDistance}
          onChange={(e) => setBufferDistance(Number(e.target.value))}
          fullWidth
          sx={{ my: 2 }}
        />

        {/* New Layer Name Input */}
        <TextField
          label="New Layer Name"
          value={newLayerName}
          onChange={(e) => setNewLayerName(e.target.value)}
          fullWidth
          sx={{ my: 2 }}
        />
      </Box>

      <Button
        onClick={handleBuffer}
        variant="contained"
        style={{ backgroundColor: "#282c34" }}
      >
        Create Buffer
      </Button>
    </BaseModal>
  );
};

export default Buffer;
