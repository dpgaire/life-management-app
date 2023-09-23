import React from "react";
import { Container } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Navbar />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
