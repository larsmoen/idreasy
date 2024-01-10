import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ModalStyle from "../utils/ModalStyle";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useLanguage from "../hook/useLanguage";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const handleClose = () => {
    onClose(); // Call the existing close functionality
    navigate("/idreasy"); // Navigate to the home page
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={ModalStyle}>
        {children}
        <Button onClick={handleClose} sx={{ my: 2, color: "red" }}>
          {/* {t("baseModalClose")} */}
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default BaseModal;
