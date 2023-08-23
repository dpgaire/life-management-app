import React from "react";
import SignUp from "../components/SignUp";
import { Container } from "@mui/material";

const Signup = () => {
  return (
    <Container sx={{ marginTop: '20px', padding: '20px' }}>
      <SignUp />
    </Container>
  );
};

export default Signup;
