import { Container } from '@mui/material'
import React from 'react'
import ExpensesComponent from '../components/ExpensesComponent'

const Expenses = () => {
  return (
    <Container sx={{ marginTop: "20px", padding: "20px" }}>
      <ExpensesComponent />
    </Container>
  )
}

export default Expenses