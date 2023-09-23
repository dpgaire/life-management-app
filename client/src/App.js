import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Layout from "./components/UI/Layout";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Layout>
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
      </Layout>
    </Router>
  );
}

export default App;
