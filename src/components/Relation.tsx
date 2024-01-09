import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalStyle from "../utils/ModalStyle";
import BaseModal, { ModalProps } from "./BaseModal";

interface RelationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Relation: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </BaseModal>
  );
};

export default Relation;
