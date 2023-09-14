import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const ErrorMessage = ({error}) => {
  return (
    <Alert severity="error" style={{ marginBottom: "10px" }}>
      <AlertTitle> {error}</AlertTitle>
    </Alert>
  );
};

export default ErrorMessage;
