import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

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

const DynamicModal = ({ open, setIsOpen, title, children }) => {

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ ...customModalStyle, maxHeight: "90%", position: "relative" }}>
        <Typography variant="h5" id="modal-title" gutterBottom>
          {title}
        </Typography>
        <CloseIcon
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            cursor: "pointer",
          }}
        />
        <Box>{children}</Box>
      </Box>
    </Modal>
  );
};

export default DynamicModal;
