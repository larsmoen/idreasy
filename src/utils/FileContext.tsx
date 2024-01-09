import React, { createContext, useState, useContext, ReactNode } from "react";
import { FeatureCollection } from "geojson";
import { Layer } from "../utils/types";

interface FileContextType {
  layers: Layer[];
  addLayer: (layer: Layer) => void;
  removeLayer: (layerName: string) => void;
  updateLayerVisibility: (layerName: string, isVisible: boolean) => void;
}

const FileContext = createContext<FileContextType>({
  layers: [],
  addLayer: () => {},
  removeLayer: () => {},
  updateLayerVisibility: () => {},
});

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [layers, setLayers] = useState<Layer[]>([]);

  const addLayer = (layer: Layer) => {
    setLayers((currentLayers) => [...currentLayers, layer]);
  };

  const removeLayer = (layerName: string) => {
    setLayers((currentLayers) =>
      currentLayers.filter((layer) => layer.name !== layerName)
    );
  };

  const updateLayerVisibility = (layerName: string, isVisible: boolean) => {
    setLayers((layers) =>
      layers.map((layer) =>
        layer.name === layerName ? { ...layer, visible: isVisible } : layer
      )
    );
  };

  return (
    <FileContext.Provider
      value={{ layers, addLayer, removeLayer, updateLayerVisibility }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);
