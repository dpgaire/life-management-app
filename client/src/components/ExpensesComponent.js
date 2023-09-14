import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useGetExpensesQuery } from "../app/services/expenseApi";

const ExpenseComponent = () => {
  useAuth();
  // const token = useSelector((state) => state.auth.token); //
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [editedExpenseItem, setEditedExpenseItem] = useState();
  const [editedExpenseAmount, setEditedExpenseAmount] = useState();
  const [editedExpenseId, setEditedExpenseId] = useState(null);
  const [newExpenseItem, setNewExpenseItem] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");

  const token_storage = localStorage.getItem("token");

  const { data: expensesData, isLoading, isError } = useGetExpensesQuery(undefined, {
    // Pass the token as a header in the request
    headers: {
      Authorization: token_storage,
    },
  });

  console.log('VexpensesData',expensesData)

  // const fetchExpenses = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3002/api/expenses", {
  //       headers: {
  //         Authorization: token_storage,
  //         "Content-Type": "application/json",
  //         userId: token_storage,
  //       },
  //     });
  //     const data = await response.json();
  //     setExpenses(data);
  //   } catch (error) {
  //     console.error("Error fetching expenses:", error);
  //   }
  // };


  // useEffect(() => {

  // }, [navigate, token]);

  // useEffect(() => {
  //   fetchExpenses();
  // }, []);

  const handleAddExpense = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token_storage,
        },
        body: JSON.stringify({
          item: newExpenseItem,
          amount: newExpenseAmount,
        }),
      });

      if (response.status === 201) {
        setNewExpenseItem("");
        setNewExpenseAmount("");
        // fetchExpenses();
      } else {
        console.error("Error adding expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleUpdateExpense = async (id) => {
    if (!editedExpenseItem.trim()) return;

    try {
      const response = await fetch(`http://localhost:3002/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token_storage,
        },
        body: JSON.stringify({
          item: editedExpenseItem, // Use editedExpenseItem instead of editedExpense
          amount: editedExpenseAmount,
        }),
      });

      if (response.status === 200) {
        // fetchExpenses();
        setEditedExpenseAmount("");
        setEditedExpenseItem(""); // Clear the edited expense item
        setEditedExpenseId(null);
      } else {
        console.error("Error updating expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/expenses/${id}`, {
        method: "DELETE",
        // headers: {
        //   Authorization: token,
        // },
      });

      if (response.status === 204) {
        // fetchExpenses();
      } else {
        console.error("Error deleting expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = (expense) => {
    setEditedExpenseId(expense.id); // Set the edited expense ID
    setEditedExpenseItem(expense.item); // Pre-fill the input fields
    setEditedExpenseAmount(expense.amount);
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Expense Management
        </Typography>
        <TextField
          label="Item"
          fullWidth
          value={newExpenseItem}
          onChange={(e) => setNewExpenseItem(e.target.value)}
        />
        <TextField
          label="Amount"
          fullWidth
          style={{ marginTop: "10px" }}
          value={newExpenseAmount}
          onChange={(e) => setNewExpenseAmount(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={handleAddExpense}
        >
          Add Expense
        </Button>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses?.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    {editedExpenseId === expense.id ? (
                      <TextField
                        value={editedExpenseItem}
                        onChange={(e) => setEditedExpenseItem(e.target.value)}
                      />
                    ) : (
                      expense.item
                    )}
                  </TableCell>
                  <TableCell>
                    {editedExpenseId === expense.id ? (
                      <TextField
                        value={editedExpenseAmount}
                        onChange={(e) => setEditedExpenseAmount(e.target.value)}
                      />
                    ) : (
                      expense.amount
                    )}
                  </TableCell>
                  <TableCell>
                    {editedExpenseId === expense.id ? (
                      <Button
                        onClick={() => handleUpdateExpense(expense.id)}
                        color="primary"
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton
                        onClick={() => handleEditExpense(expense)} // Pass the whole expense object
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteExpense(expense.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ExpenseComponent;
