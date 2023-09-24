import React from "react";
import { Button, Grid, Box } from "@mui/material";

import Navbar from "./UI/Navbar";
import { Link } from "react-router-dom";
import Search from "./UI/Search";
import Buttons from "./UI/Button";
import AddIcon from "@mui/icons-material/Add";
import TaskCard from "./UI/TaskCard";

// import { getTasks, addTask, updateTask, deleteTask } from "../store/actions/taskAction"; // Import the specific action creators
let taskData = [
  {
    name: "Develop the Card ",
    description:
      " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    categories: ["MyProject", "Category 2"],
    date: "September 2 2023",
    status: "ToDo",
  },
  {
    name: "Develop the Card ",
    description:
      " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    categories: ["MyProject", "Category 2"],
    date: "September 4 2023",
    status: "Done",
  },
  {
    name: "Develop the Card ",
    description:
      " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    categories: ["MyProject", "Category 2"],
    date: "September 6 2023",
    status: "OnGoing",
  },
  {
    name: "Develop the Card ",
    description:
      " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    categories: ["MyProject", "Category 2"],
    date: "September 2 2023",
    status: "ToDo",
  },
  {
    name: "Develop the Card ",
    description:
      " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    categories: ["MyProject", "Category 2"],
    date: "September 4 2023",
    status: "Done",
  },
  {
    name: "Develop the Card ",
    description:
      " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    categories: ["MyProject", "Category 2"],
    date: "September 6 2023",
    status: "OnGoing",
  },
];

const TaskComponent = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        <Grid item xs={2}>
          <Box sx={{ backgroundColor: "#F1F2F3", height: "100%" }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  sx={{ width: "100%", textAlign: "center" }}
                  component={Link}
                  to="/dashboard"
                  color="inherit"
                >
                  Dashboard
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  sx={{ width: "100%", textAlign: "center" }}
                  component={Link}
                  to="/tasks"
                  color="inherit"
                >
                  Tasks
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ width: "100%", textAlign: "center" }}
                  component={Link}
                  to="/expenses"
                  color="inherit"
                >
                  Expenses
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ width: "100%", textAlign: "center" }}
                  component={Link}
                  to="/notes"
                  color="inherit"
                >
                  Notes
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ width: "100%", textAlign: "center" }}
                  component={Link}
                  to="/categories"
                  color="inherit"
                >
                  Categories
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Search />
            </Grid>
            <Grid item xs={2}>
              <Buttons
                text="Add Task"
                variant={"contained"}
                color="success"
                Icon={<AddIcon />}
                isLoading={false}
              />
            </Grid>
          </Grid>
          <Box style={{ margin: "10px 0", padding: "10px" }}>
            <Grid container spacing={3}>
              {taskData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <TaskCard
                    name={item.name}
                    description={item.description}
                    categories={item.categories}
                    date={item.date}
                    status={item.status}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskComponent;
