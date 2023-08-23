import React from 'react'
import TaskComponent from '../components/TaskComponent'
import { Container } from '@mui/material'

const Tasks = () => {
  return (
    <Container sx={{ marginTop: "20px", padding: "20px" }}>
    <TaskComponent />
  </Container>
  )
}

export default Tasks