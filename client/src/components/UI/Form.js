import { Grid } from "@mui/material";
import React from "react";

const Form = ({ handleSubmit, children }) => {
  return (
    <div>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {children}
        </Grid>
      </form>
    </div>
  );
};

export default Form;
