import React from "react";
import DashboardComponent from "../components/DashboardComponent";
import { Container } from "@mui/material";

const Dashboard = () => {
  return (
    <Container sx={{ marginTop: "20px", padding: "20px" }}>
      <DashboardComponent />
      {/* <p>Dashboard</p> */}
    </Container>
  );
};

export default Dashboard;
