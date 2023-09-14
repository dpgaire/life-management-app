import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";

const customStyles = {
  appBar: {
    borderRadius: 15,
    marginBottom: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    "@media (max-width:600px)": {
      flexDirection: "column",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none", // Remove underlines from links
    color: "#333", // You can specify your own color
    fontSize: "2em",
    fontWeight: 300,
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    "@media (max-width:600px)": {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    // width: "300px",
    // position:'relative',
    gap: "10px",
    alignItems: "center",
    "@media (max-width:600px)": {
      width: "auto",
      marginTop: "20px",
      justifyContent: "center",
    },
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  purple: {
    color: "#fff", // You can specify your own color
    backgroundColor: "#1976D2",
  },
};

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the menu

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true); // Open the menu
  };

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setIsMenuOpen(false); // Close the menu
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
    handleMenuClose();
  }, [dispatch, navigate, handleMenuClose]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logout]);

  return (
    <AppBar style={customStyles.appBar} position="static" color="inherit">
      <Link to="/" style={customStyles.brandContainer}>
        <Typography variant="h6" component="div">
          <Avatar
            style={{ padding: "10px", borderRadius: "10px" }}
            variant="square"
            sx={{ bgcolor: "#1976D2" }}
          >
            LMA
          </Avatar>
        </Typography>
      </Link>
      <Toolbar style={customStyles.toolbar}>
        {user?.user ? (
          <div className={customStyles.profile}>
            <Button  component={Link} to="/tasks" color="primary">
              Tasks
            </Button>
            <Button component={Link} to="/notes" color="primary">
              Notes
            </Button>
            <Button component={Link} to="/expenses" color="primary">
              Expenses
            </Button>
            <Button component={Link} to="/categories" color="primary">
              Categories
            </Button>
            <IconButton onClick={handleMenuOpen}>
              <Avatar style={customStyles.purple} alt={user?.user.username}>
                {/* {user?.user.user.username} */}HA
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <Button>Settings</Button>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Button>Logout</Button>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
