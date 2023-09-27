import React, { useEffect, useMemo, useState } from "react";
import { Button, Grid, Box, Typography, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "./UI/Navbar";
import { Link } from "react-router-dom";
import Search from "./UI/Search";
import Buttons from "./UI/Button";
import ExpenseCard from "./UI/ExpenseCard";
import DynamicModal from "./UI/DynamicModal";
import IconDelete from "@mui/icons-material/Delete";
import Form from "./UI/Form";

const ExpenseComponent = () => {
  const [expenses, setExpenses] = useState([]);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({});

  const userToken = localStorage.getItem("profile");

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/expenses", {
        headers: {
          Authorization: "Bearer " + JSON.parse(userToken).token,
          "Content-Type": "application/json",
          userId: JSON.parse(userToken).token,
        },
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async (data) => {
    try {
      const response = await fetch("http://localhost:3002/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(userToken).token,
        },
        body: JSON.stringify({
          ...data,
          category_ids: [1],
        }),
      });
      if (response.status === 201) {
        setForm({});
        fetchExpenses();
        setIsAddModal(false);
      } else {
        console.error("Error adding expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleUpdateExpense = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/expenses/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(userToken).token,
          },
          body: JSON.stringify({
            ...data,
            category_ids: data.categories.map((item) => item.id),
          }),
        }
      );

      if (response.status === 200) {
        fetchExpenses();
        setIsEditModal(false);
      } else {
        console.error("Error updating expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleEditExpense = async (data) => {
    handleUpdateExpense(data);
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + JSON.parse(userToken).token,
        },
      });

      if (response.status === 200) {
        fetchExpenses();
        setIsDeleteModal(false);
        setDeleteId(null);
      } else {
        console.error("Error deleting expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchExpenses();
    }
  }, []);

  const handleClick = () => {
    setIsAddModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModal(true);
    // handleDeleteExpense(id)
  };

  const handleUpdate = (id) => {
    setIsEditModal(true);
    const filterData = expenses.find((item) => item.id === id);
    setForm(filterData);
  };

  // Calculate the total price using useMemo
  const calculateTotalPrice = useMemo(() => {
    let totalPrice = 0;
    expenses.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    return totalPrice.toFixed(2);
  }, [expenses]);

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
            <Grid item xs={9}>
              <Search />
            </Grid>
            <Grid item xs={3}>
              <Buttons
                text="Add Expense"
                variant={"contained"}
                color="success"
                Icon={<AddIcon />}
                isLoading={false}
                handleClick={handleClick}
              />
            </Grid>
          </Grid>
          {/* Add Expense */}
          <DynamicModal
            open={isAddModal}
            setIsOpen={setIsAddModal}
            title={"Add Expense"}
            isCloseIcon
          >
            <Form
              fields={fields}
              submitText={"Add Expense"}
              onSubmit={(data) => {
                handleAddExpense(data);
              }}
            />
          </DynamicModal>
          {/* Edit Expense */}
          <DynamicModal
            open={isEditModal}
            setIsOpen={setIsEditModal}
            title={"Edit Expense"}
            isCloseIcon
          >
            <Form
              fields={fields}
              submitText={"Edit Expense"}
              initialState={form}
              onSubmit={(data) => {
                console.log('data', data);
                handleEditExpense(data);
              }}
            />
          </DynamicModal>
          {/* Delete Expense */}
          <DynamicModal
            open={isDeleteModal}
            setIsOpen={setIsDeleteModal}
            title={"Delete Expense"}
          >
            <Alert
              severity="warning"
              sx={{ fontSize: "18px", marginTop: "10px", padding: "10px" }}
            >
              Are you sure you want to delete?
            </Alert>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Buttons
                handleClick={() => handleDeleteExpense(deleteId)}
                text={"Delete"}
                variant="contained"
                color="error"
                type={"submit"}
                Icon={<IconDelete />}
              >
                Delete
              </Buttons>
              <Button
                variant="contained"
                type={"button"}
                onClick={() => setIsDeleteModal(false)}
              >
                Cancel
              </Button>
            </Box>
          </DynamicModal>
          <Box style={{ margin: "10px 0", padding: "10px" }}>
            <Grid container spacing={3}>
              {expenses?.map((expense, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <ExpenseCard
                    item={expense.item}
                    price={expense.price}
                    id={expense.id}
                    quantity={expense.quantity}
                    created_at={expense.created_at}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h3" xs={{ textAlign: "center" }}>
          Total Expense: Rs.{calculateTotalPrice}
        </Typography>
      </div>
    </div>
  );
};

export default ExpenseComponent;

const fields = [
  {
    name: "item",
    label: "Item",
    type: "text",
  },
  {
    name: "price",
    label: "Price",
    type: "text",
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "text",
  },
];
