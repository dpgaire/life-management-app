import { Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  return (
    <div style={{padding:'10px'}}>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Life Management App
        </Typography>
        <Typography variant="body1" align="center">
          Let's put yourself up!
        </Typography>
      </Paper>
    </div>
  )
}

export default Home