import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
