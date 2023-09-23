import React from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Buttons = ({
  isLoading,
  text,
  type,
  variant,
  Icon,
  color,
  handleClick,
}) => {
  const isIconOnly = variant === "iconOnly";
  return (
    <div>
      {isIconOnly ? (
        <IconButton aria-label="icon-button" onClick={handleClick}>
          {isLoading ? <CircularProgress size={24} /> : Icon || ""}
        </IconButton>
      ) : (
        <Button
          onClick={handleClick}
          variant={variant}
          color={color || "primary"}
          startIcon={Icon}
          type={type}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : text}
        </Button>
      )}
    </div>
  );
};

export default Buttons;
