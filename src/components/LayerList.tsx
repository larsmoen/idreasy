import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { VisibilityOffTwoTone, VisibilityTwoTone } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/GetApp"; // Icon for download
import Switch from "@mui/material/Switch";
import useLanguage from "../hook/useLanguage";
import { useFiles } from "../utils/FileContext";
import { Layer } from "../utils/types";

const LayerList: React.FC = () => {
  const { t } = useLanguage();
  const { layers, removeLayer, updateLayerVisibility } = useFiles();

  const handleVisibilityChange = (layerName: string, isVisible: boolean) => {
    updateLayerVisibility(layerName, isVisible);
  };

  const downloadLayer = (layer: Layer) => {
    const layerDataStr = JSON.stringify(layer.data, null, 2);
    const blob = new Blob([layerDataStr], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${layer.name}.geojson`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* <h2>{t("layers")}</h2> */}
      <h2>Layers</h2>
      <List>
        {layers.map((layer, index) => (
          <ListItem key={layer.name || index.toString()}>
            <ListItemText primary={layer.name} />
            <IconButton
              onClick={() => handleVisibilityChange(layer.name, !layer.visible)}
            >
              {layer.visible ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />}
            </IconButton>
            <IconButton
              edge="end"
              aria-label="download"
              onClick={() => downloadLayer(layer)}
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeLayer(layer.name)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LayerList;
