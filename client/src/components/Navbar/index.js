import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
    "@media (maxWidth:600px)": {
      flexDirection: "column",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#333",
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
    "@media (maxWidth:600px)": {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "center",
    "@media (maxWidth:600px)": {
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
    color: "#fff",
    backgroundColor: "#1976D2",
  },
  drawerPaper: {
    backgroundColor: "#1976D2",
    color: "#fff",
  },
  drawerList: {
    width:280,
    paddingTop: "20px",
  },
  drawerItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#1565C0",
    },
  },
};

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control the drawer menu

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const logout = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
    setIsDrawerOpen(false);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logout]);

  return (
    <>
      <AppBar style={customStyles.appBar} position="static" color="inherit">
        <Link to="/" style={customStyles.brandContainer}>
          <Typography variant="h6" component="div">
            <Avatar
              style={{
                padding: "0 5px",
                marginLeft: "10px",
                borderRadius: "10px",
              }}
              variant="square"
              sx={{ bgcolor: "#1976D2" }}
            >
              LMA
            </Avatar>
          </Typography>
        </Link>
        <Toolbar style={customStyles.toolbar}>
          {user?.user ? (
            <IconButton
              onClick={toggleDrawer(true)}
              color="inherit"
              aria-label="open drawer"
              edge="end"
            >
              <Avatar style={customStyles.purple} alt={user?.user.username}>
                {user
                  ? user.user.name
                      .split(" ")
                      .map((word, index) =>
                        index === 0 || index === 1 ? word[0] : ""
                      )
                      .join("")
                  : ""}
              </Avatar>
            </IconButton>
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

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        classes={{
          paper: customStyles.drawerPaper,
        }}
      >
        <List style={customStyles.drawerList}>
          <ListItem
            button
            component={Link}
            to="/tasks"
            style={customStyles.drawerItem}
          >
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/notes"
            style={customStyles.drawerItem}
          >
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/expenses"
            style={customStyles.drawerItem}
          >
            <ListItemText primary="Expenses" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/categories"
            style={customStyles.drawerItem}
          >
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem
            button
            onClick={logout}
            style={customStyles.drawerItem}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
