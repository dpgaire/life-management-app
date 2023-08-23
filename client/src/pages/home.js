import { Paper, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
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