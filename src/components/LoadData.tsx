import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Typography, styled } from "@mui/material";
// import Typography from "@mui/material/Typography";
import BaseModal, { ModalProps } from "./BaseModal";
import { useFiles } from "../utils/FileContext";
import useLanguage from "../hook/useLanguage";
import { FeatureCollection } from "geojson";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  my: 2,
});

const LoadData: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { addLayer } = useFiles(); // Updated to use addLayer for the Layer interface

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);

      fileList.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (!e.target) {
            console.error("Failed to read file");
            return;
          }
          try {
            const geoJson = JSON.parse(
              e.target.result as string
            ) as FeatureCollection;
            const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");

            // Create a new Layer object
            const newLayer = {
              name: fileNameWithoutExtension,
              data: geoJson,
              visible: true, // Default visibility
              style: {}, // Default style, customize as needed
            };

            addLayer(newLayer);
          } catch (error) {
            console.error("Error reading file:", error);
          }
        };
        reader.readAsText(file);
      });
    }
  };

  return (
    <div>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <Typography
          style={{ marginBottom: "1rem" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Upload Data
          {/* {t("loadDataTitle")} */}
        </Typography>
        <Button
          component="label"
          variant="contained"
          style={{ backgroundColor: "#282c34" }}
        >
          {/* {t("loadDataButton")} */}
          Choose File(s)
          <VisuallyHiddenInput
            type="file"
            accept=".json, .geojson"
            multiple
            onChange={handleFileChange}
          />
        </Button>
      </BaseModal>
    </div>
  );
};

export default LoadData;
