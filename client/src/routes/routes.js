import React from "react";
import { Route, Navigate } from "react-router-dom";

const PublicRoute = ({ path, element: Element, isAuthenticated }) => (
  <Route path={path} element={!isAuthenticated ? <Element /> : null} />
);

const PrivateRoute = ({ path, element: Element, isAuthenticated }) => (
  <Route
    path={path}
    element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
  />
);

export { PublicRoute, PrivateRoute };
