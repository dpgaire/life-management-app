import React from "react";
import { Container } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  // Define an array of routes where you want to show the Navbar and Footer
  const showNavbarAndFooterRoutes = ["/", "/auth"];

  // Check if the current route matches any of the showNavbarAndFooterRoutes
  const shouldShowNavbarAndFooter = showNavbarAndFooterRoutes.includes(
    location.pathname
  );

  return (
    <Container maxWidth="xl">
      {shouldShowNavbarAndFooter && <Navbar />}
      {children}
      {shouldShowNavbarAndFooter && <Footer />}
    </Container>
  );
};

export default Layout;
