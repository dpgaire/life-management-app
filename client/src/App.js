import React, { useEffect } from "react";
import { Container, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
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
import NotFound from "./components/NotFound";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar";

function App() {
  const user = null;
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
