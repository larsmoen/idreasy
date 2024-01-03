import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletBaseMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Initialize the map
      mapInstance.current = L.map(mapRef.current).setView([63.42, 10.4], 12);

      // Add OpenStreetMap tiles
      L.tileLayer(
        "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}",
        {
          attribution: '<a href="http://www.kartverket.no/">Kartverket</a>',
        }
      ).addTo(mapInstance.current);
    }

    // Cleanup function to avoid memory leaks
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div className="map" id="map" ref={mapRef} />;
};

export default LeafletBaseMap;
