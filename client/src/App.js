import React from "react";
import {  Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import {
  Categories,
  Expenses,
  Login,
  Signup,
  Notes,
  Tasks,
  Home,
  Dashboard,
} from "./pages";

function App() {
  return (
    <Paper elevation={3} style={{ padding: "20px", height:'auto' }}>
        <Router>
          <NavigationBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
    </Paper>
  );
}

export default App;
