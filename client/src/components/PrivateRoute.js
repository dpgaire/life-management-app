import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? (
    // <Routes>
    <Route {...props} />
  ) : (
    // </Routes>
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
