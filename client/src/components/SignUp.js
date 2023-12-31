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
import { useSelector } from "react-redux";

function SignUp() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) =>
      prevErrors?.filter((error) => error.path !== name)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        navigate("/login");
        console.log("User registered successfully", data);
      } else if (response.status === 400) {
        setErrors(data?.errors);
        setErrorMessage(data.error_message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Sign Up
        </Typography>
        {errorMessage && (
          <Alert severity="error" style={{ marginBottom: "15px" }}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Username"
                fullWidth
                // required
                value={formData.username}
                onChange={handleChange}
              />
              {errors?.map(
                (error) =>
                  error.path === "username" && (
                    <div
                      key={error.msg}
                      style={{ color: "red", padding: "5px 0" }}
                    >
                      {error.msg}
                    </div>
                  )
              )}
            </Grid>

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
              {errors?.map(
                (error) =>
                  error.path === "email" && (
                    <div
                      key={error.msg}
                      style={{ color: "red", padding: "5px 0" }}
                    >
                      {error.msg}
                    </div>
                  )
              )}
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
              {errors?.map(
                (error) =>
                  error.path === "password" && (
                    <div
                      key={error.msg}
                      style={{ color: "red", padding: "5px 0" }}
                    >
                      {error.msg}
                    </div>
                  )
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default SignUp;
