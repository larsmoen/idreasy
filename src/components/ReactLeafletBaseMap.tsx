import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useFiles } from "../utils/FileContext";
import { Feature } from "geojson";
import L from "leaflet";

const ReactLeafletBaseMap: React.FC = () => {
  const position: [number, number] = [63.42, 10.4];
  const { layers } = useFiles(); // Updated to use the geoJsonFiles

  const pointToLayer = (feature: Feature, latlng: L.LatLng): L.Layer => {
    if (feature.geometry.type === "Point") {
      return L.circleMarker(latlng, {
        radius: 5,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      });
    }
    return L.marker(latlng);
  };

  return (
    <MapContainer
      center={position}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}"
        attribution='<a href="http://www.kartverket.no/">Kartverket</a>'
      />
      {layers.map(
        (layer, index) =>
          layer.visible && (
            <GeoJSON
              key={index}
              data={layer.data}
              style={layer.style}
              pointToLayer={pointToLayer}
            />
          )
      )}
    </MapContainer>
  );
};

export default ReactLeafletBaseMap;
