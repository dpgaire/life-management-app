import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/thunks/authThunk";

function LogIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token); //

  console.log("token", token);
  console.log("error", error);
  console.log("loading", loading);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // if (name === "email" || name === "password") {
    //   // Clear validation errors for the specific input field
    //   setValidationErrors(
    //     validationerrors.filter((error) => error.path !== name)
    //   );
    //   // setErrorMessage(null);
    // }

    // setErrors((prevErrors) =>
    //   prevErrors?.filter((error) => error.path !== name)
    // );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   postData();
  //   if (!loading && !errorMessage && !validationerrors) {
  //     navigate("/dashboard");
  //     localStorage.setItem("token", responseData.token);
  //   }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (token) {
    //   navigate("/dashboard");
    // }
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, dispatch, token]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Log In
        </Typography>
        {error && (
          <Alert severity="error" style={{ marginBottom: "15px" }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                // required
                value={formData.email}
                onChange={handleChange}
              />
              {/* {validationerrors?.map(
                (error) =>
                  error.path === "email" && (
                    <div
                      key={error.msg}
                      style={{ color: "red", padding: "5px 0" }}
                    >
                      {error.msg}
                    </div>
                  )
              )} */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                // required
                value={formData.password}
                onChange={handleChange}
              />
              {/* {validationerrors?.map(
                (error) =>
                  error.path === "password" && (
                    <div
                      key={error.msg}
                      style={{ color: "red", padding: "5px 0" }}
                    >
                      {error.msg}
                    </div>
                  )
              )} */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LogIn;
