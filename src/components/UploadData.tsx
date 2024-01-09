import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMap } from "react-leaflet";
import { fromArrayBuffer, GeoTIFFImage } from "geotiff";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geotiff-2";
import "leaflet-geotiff/leaflet-geotiff-plotty";
import "leaflet-geotiff/leaflet-geotiff-vector-arrows";
import BaseModal, { ModalProps } from "./BaseModal";

declare module "leaflet" {
  export function leafletGeotiff(url: string, options?: any): any;
}

const UploadData: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const map = useMap(); // Only if using react-leaflet

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      // Convert and display the GeoTIFF
      const reader = new FileReader();
      reader.onload = function (event) {
        const arrayBuffer = reader.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          DisplayGeoTIFF(arrayBuffer, map);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  }, [selectedFile, map]); // Dependency array

  const getCornerCoordinates = async (
    arrayBuffer: ArrayBuffer
  ): Promise<L.LatLngBounds> => {
    const tiff = await fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    const metadata = image.getFileDirectory();

    // Affine transformation coefficients
    const [a, b, c, d, e, f] =
      metadata.ModelTransformation || metadata.ModelPixelScale;

    // Image dimensions
    const width = image.getWidth();
    const height = image.getHeight();

    // Transform function
    const transform = (x: number, y: number): [number, number] => {
      return [a * x + b * y + c, d * x + e * y + f];
    };

    // Calculate corner coordinates
    const topLeft = transform(0, 0);
    const topRight = transform(width, 0);
    const bottomLeft = transform(0, height);
    const bottomRight = transform(width, height);

    // Create LatLngBounds object (using Leaflet)
    return L.latLngBounds([bottomLeft, topLeft, topRight, bottomRight]);
  };

  const DisplayGeoTIFF = async (arrayBuffer: ArrayBuffer, map: L.Map) => {
    try {
      const GeoTIFF = await import("geotiff");
      const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
      const image = await tiff.getImage();
      const rasters = await image.readRasters();
      const cornerCoordinates = await getCornerCoordinates(arrayBuffer);

      const width = image.getWidth();
      const height = image.getHeight();

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not create canvas context");

      const imageData = context.createImageData(width, height);
      const raster = rasters[0]; // Assuming single-band raster

      if (
        raster instanceof Uint8Array ||
        raster instanceof
          Float32Array /* add other TypedArray types as needed */
      ) {
        for (let i = 0, j = 0; i < raster.length; i++, j += 4) {
          imageData.data[j] = raster[i]; // Red
          imageData.data[j + 1] = raster[i]; // Green
          imageData.data[j + 2] = raster[i]; // Blue
          imageData.data[j + 3] = 255; // Alpha (fully opaque)
        }

        context.putImageData(imageData, 0, 0);
        const dataUrl = canvas.toDataURL();

        // Displaying the GeoTIFF on the map
        // L.leafletGeotiff(dataUrl, {
        //   bounds: cornerCoordinates,
        // }).addTo(map);

        L.imageOverlay(dataUrl, cornerCoordinates).addTo(map);
      } else {
        throw new Error("Unsupported TypedArray type");
      }
    } catch (error) {
      console.error("Error processing GeoTIFF:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Typography id="modal-title" variant="h6" component="h2">
        Upload GeoTIFF File
      </Typography>
      <input
        type="file"
        accept=".tif,.tiff"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span">
          Select GeoTIFF File
        </Button>
      </label>
      <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </BaseModal>
  );
};

export default UploadData;
