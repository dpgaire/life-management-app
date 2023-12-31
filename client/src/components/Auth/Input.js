import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const DynamicField = ({
  name,
  handleChange,
  value,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  error,
  errorMessage,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        error={error}
        name={name}
        onChange={(e) => handleChange(e, name)}
        variant="outlined"
        fullWidth
        label={label}
        autoFocus={autoFocus}
        value={value}
        helperText={errorMessage}
        type={type}
        autoComplete="off"
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default DynamicField;
