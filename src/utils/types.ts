import { FeatureCollection } from "geojson";

export type Language = "nn" | "en" | "de";

export interface Layer {
  name: string;
  data: FeatureCollection;
  visible: boolean;
  style: any;
}
