import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const customModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Adjust the width as needed
  maxWidth: "600px", // Maximum width of the modal content
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const DynamicModal = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ ...customModalStyle, maxHeight: "90%" }}>
        <Typography variant="h5" id="modal-title" gutterBottom>
          {title}
        </Typography>
        <Typography id="modal-description" gutterBottom>
          {children}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DynamicModal;
