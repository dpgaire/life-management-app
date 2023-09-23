import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/UI/ItemCard";

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
        <Box xs={{ margin: "10px" }}>
          <Grid container spacing={6}>
            {itemData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <ItemCard title={item.title} content={item.content} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Home;
