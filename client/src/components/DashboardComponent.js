import {
  Grid,
  Box,
  Button,
} from "@mui/material";
import React from "react";
import Search from "./UI/Search";
import NoteCard from "./UI/NoteCard";
import { Link } from "react-router-dom";
import TaskCard from "./UI/TaskCard";
import ExpenseCard from "./UI/ExpenseCard";
import Navbar from "./UI/Navbar";


let itemData = [
  {
    title: "How To Enjoy Your Life",
    content:
      " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
  {
    title: "How To Enjoy Your Life",
    content:
      " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
  {
    title: "How To Enjoy Your Life",
    content:
      " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
];
let expenseData = [
  {
    item: "Halmet",
    price: "2000",
  },
  {
    item: "Rain Coat",
    price: "3000",
  },
  {
    item: "Paint",
    price: "1600",
  },
];

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
];

const DashboardComponent = () => {
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
            <Grid item xs={12}>
              <Search />
            </Grid>
          </Grid>
          <Box style={{ margin: "10px 0", padding: "10px" }}>
            <Grid container spacing={3}>
            {/* <Typography variant="h6">Notes</Typography> */}
              {itemData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <NoteCard title={item.title} content={item.content} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box style={{ margin: "10px 0", padding: "10px" }}>
            <Grid container spacing={3}>
            {/* <Typography variant="h6">Notes</Typography> */}
            {expenseData.map((expense, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <ExpenseCard item={expense.item} price={expense.price} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box style={{ padding: "20px", marginTop: "20px" }}>
            <Grid container spacing={6}>
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
      {/* <Grid
        container
        sx={{
          backgroundColor: "#F3F6F9",
          borderRadius: "10px",
          padding: "20px",
          position: "relative",
        }}
      >
        <Grid item xs={12}>
          <SideNavBar />
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Search />
            </Grid>
            <Grid item xs={2}>
              <Buttons
                text="Add Note"
                variant={"contained"}
                color="success"
                Icon={<AddIcon />}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      {/* </Container> */}
    </div>
  );
};

export default DashboardComponent;
