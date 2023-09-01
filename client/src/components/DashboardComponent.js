import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

const DashboardComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
      // Fetch tasks data
      fetch("http://localhost:3002/api/tasks", { headers })
        .then((response) => response.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error("Error fetching tasks:", error));

      // Fetch expenses data
      fetch("http://localhost:3002/api/expenses", { headers })
        .then((response) => response.json())
        .then((data) => setExpenses(data))
        .catch((error) => console.error("Error fetching expenses:", error));

      // Fetch notes data
      fetch("http://localhost:3002/api/notes", { headers })
        .then((response) => response.json())
        .then((data) => setNotes(data))
        .catch((error) => console.error("Error fetching notes:", error));

      // Fetch categories data
      fetch("http://localhost:3002/api/categories", { headers })
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Error fetching categories:", error));
    }
  }, [token]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ minWidth: 275, marginBottom: 5 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                All the Records of your daily activities
              </Typography>
              <Typography variant="h5" component="div">
                Tasks
              </Typography>
              {/* <List>
                {tasks?.map((task) => (
                  <ListItem key={task.id}>
                    <ListItemText primary={task?.title} />
                  </ListItem>
                ))}
              </List> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ minWidth: 275, marginBottom: 5 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                All the Records of your daily activities
              </Typography>
              <Typography variant="h5" component="div">
                Expenses
              </Typography>
              <List>
                {expenses?.map((expense) => (
                  <ListItem key={expense.id}>
                    <ListItemText
                      primary={`${expense.item} - $${expense.amount}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ minWidth: 275, marginBottom: 5 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                All the Records of your daily activities
              </Typography>
              <Typography variant="h5" component="div">
                Notes
              </Typography>
              <List>
                {notes?.map((note) => (
                  <ListItem key={note.id}>
                    <ListItemText
                      primary={note.title}
                      secondary={note.content}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ minWidth: 275, marginBottom: 5 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                All the Records of your daily activities
              </Typography>
              <Typography variant="h5" component="div">
                Categories
              </Typography>
              <List>
                {categories?.map((note) => (
                  <ListItem key={note.id}>
                    <ListItemText primary={note.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardComponent;
