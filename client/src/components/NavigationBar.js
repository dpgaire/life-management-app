import React from "react";
import { AppBar, Typography, Button, Grid } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get the token from local storage

  const isDashboard = location.pathname === "/dashboard";
  const isTask = location.pathname === "/tasks";
  const isNote = location.pathname === "/notes";
  const isExpenses = location.pathname === "/expenses";
  const isCategories = location.pathname === "/categories";

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Then navigate to the home page
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          {token && (isDashboard || isTask || isCategories || isExpenses || isNote) ? (
            <Typography variant="h6" component="div">
              <Button component={Link} to="/dashboard" color="inherit">
                Dashboard
              </Button>
            </Typography>
          ) : (
            <Typography variant="h6" component="div">
              <Button component={Link} to="/" color="inherit">
                Life Management App
              </Button>
            </Typography>
          )}
        </Grid>
        {token ? (
          <Grid item>
            <Typography variant="h6" component="div" sx={{ ml: 2 }}>
              <Button component={Link} to="/tasks" color="inherit">
                Tasks
              </Button>
              <Button component={Link} to="/notes" color="inherit">
                Notes
              </Button>
              <Button component={Link} to="/expenses" color="inherit">
                Expenses
              </Button>
              <Button component={Link} to="/categories" color="inherit">
                Categories
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Typography>
          </Grid>
        ) : (
          <Grid item>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Signup
            </Button>
          </Grid>
        )}
      </Grid>
    </AppBar>
  );
}

export default NavigationBar;
