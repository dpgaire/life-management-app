import { Container } from '@mui/material'
import React from 'react'
import CategoryComponent from '../components/CategoryComponent'

const Categories = () => {
  return (
    <Container sx={{ marginTop: "20px", padding: "20px" }}>
      <CategoryComponent />
    </Container>
  )
}

export default Categories