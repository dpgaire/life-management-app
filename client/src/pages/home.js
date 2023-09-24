import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/UI/TaskCard";
import NoteCard from "../components/UI/NoteCard";
import ExpenseCard from "../components/UI/ExpenseCard";

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

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  return (
    <div style={{ padding: "10px" }}>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Life Management App
        </Typography>
        <Typography variant="body1" align="center">
          Let's put yourself up!
        </Typography>

        {/* <Box style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h6">Tasks</Typography>
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
        </Box> */}
        {/* <Box style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h6">Notes</Typography>
          <Grid container spacing={6}>
            {itemData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <NoteCard title={item.title} content={item.content} />
              </Grid>
            ))}
          </Grid>
        </Box> */}
        {/* <Box style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h6">Expenses</Typography>
          <Grid container spacing={6}>
            {expenseData.map((expense, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <ExpenseCard item={expense.item} price={expense.price} />
              </Grid>
            ))}
          </Grid>
        </Box> */}
      </Paper>
    </div>
  );
};

export default Home;
