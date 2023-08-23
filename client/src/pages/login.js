import { Container } from "@mui/material";
import React from "react";
import LogIn from "../components/LogIn";

const Login = () => {
  return (
    <Container sx={{ marginTop: "20px", padding: "20px" }}>
      <LogIn />
    </Container>
  );
};

export default Login;
