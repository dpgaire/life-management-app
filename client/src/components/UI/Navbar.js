import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const userToken = localStorage.getItem("profile");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("profile");
    navigate("/auth");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            <Button component={Link} to="/" color="inherit">
              LifeMngApp
            </Button>
          </Typography>
          {userToken ? (
            <Button
              onClick={handleLogout}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/auth" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
