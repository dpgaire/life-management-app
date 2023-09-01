import React from "react";
import { Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import { PublicRoute } from "./routes/routes";

function App() {
  // function PrivateRoute(props) {
  const isAuthenticated = useSelector((state) => state.auth.token);
  //   console.log("isAuthenticated", isAuthenticated);
  //   return isAuthenticated ? (
  //     // <Routes>
  //     <Route {...props} />
  //   ) : (
  //     // </Routes>
  //     <Navigate to="/login" />
  //   );
  // }
  return (
    <Paper elevation={3} style={{ padding: "20px", height: "auto" }}>
      <Router>
        <NavigationBar />
        <Routes>
          {/* <PublicRoute
            path="/"
            element={<Home />}
            isAuthenticated={isAuthenticated}
          /> */}

          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>
    </Paper>
  );
}

export default App;
