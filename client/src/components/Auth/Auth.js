import React, { useState } from "react";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";
import Form from "../UI/Form";
import ItemCard from "../UI/ItemCard";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Define custom styles using a style object
const customStyles = {
  paper: {
    padding: "20px",
    marginBottom: "20px",
  },
  form: {
    width: "100%",
  },
  submit: {
    marginTop: "16px",
  },
  switchButton: {
    marginTop: "16px",
    textAlign: "center",
  },
};

function LogIn() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const switchMode = () => {
    setForm(initialState);
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    console.log("firstName");
    e.preventDefault();
    const fieldErrors = {};
    for (const key in initialState) {
      if (form[key] === "") {
        fieldErrors[key] = true;
      } else {
        fieldErrors[key] = false;
      }
    }
    setErrors(fieldErrors);
    if (isSignup) {
      dispatch(signup(form, navigate, setIsSignup));
      setForm(initialState);
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const handleChange = (e, fieldName) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: value === "",
    }));
  };



  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={customStyles.paper}>
        <Typography
          style={{ textAlign: "center", padding: "10px 0" }}
          component="h1"
          variant="h5"
        >
          {isSignup ? "Sign Up" : "Log In"}
        </Typography>
        
       
        <form style={customStyles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  isError={errors.firstName}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  isError={errors.lastName}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              isError={errors.email}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              isError={errors.password}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                isError={errors.confirmPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={customStyles.switchButton}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Log In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default LogIn;
