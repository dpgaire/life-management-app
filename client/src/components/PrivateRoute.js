import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.token);

  const checkUserToken = () => {
    if (!isAuthenticated || isAuthenticated === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isAuthenticated]);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default PrivateRoute;
