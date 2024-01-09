import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProviderProps {
  children?: React.ReactNode;
}
const MapContext = createContext<L.Map | null>(null);

const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  console.log("MAP INIT");
  useEffect(() => {
    if (mapContainerRef.current && !map) {
      console.log("MAP EFFECT");
      // Initialize the map
      const initialMap = L.map(mapContainerRef.current).setView(
        [63.42, 10.4],
        12
      );
      L.tileLayer(
        "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}",
        {
          attribution: '<a href="http://www.kartverket.no/">Kartverket</a>',
        }
      ).addTo(initialMap);

      setMap(initialMap);
    }

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, []);

  return (
    <MapContext.Provider value={map}>
      {children}
      <div ref={mapContainerRef} className="map" />
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);

export default MapProvider;
