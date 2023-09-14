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

const CategoryComponent = () => {
  const token = useSelector((state) => state.auth.token); //
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/categories", {
        headers: {
          Authorization: token
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          name: newCategoryName,
        }),
      });

      if (response.status === 201) {
        setNewCategoryName("");
        fetchCategories();
      } else {
        console.error("Error adding category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditedCategoryId(category.id);
    setEditedCategoryName(category.name);
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/categories/${editedCategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify({
            name: editedCategoryName,
          }),
        }
      );

      if (response.status === 200) {
        fetchCategories();
        setEditedCategoryId(null);
        setEditedCategoryName("");
      } else {
        console.error("Error updating category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token
          },
        }
      );

      if (response.status === 204) {
        fetchCategories();
      } else {
        console.error("Error deleting category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Category Management
        </Typography>
        <TextField
          label="Category Name"
          fullWidth
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {editedCategoryId === category.id ? (
                      <TextField
                        value={editedCategoryName}
                        onChange={(e) => setEditedCategoryName(e.target.value)}
                      />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editedCategoryId === category.id ? (
                      <Button
                        onClick={handleUpdateCategory}
                        color="primary"
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton
                        onClick={() => handleEditCategory(category)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteCategory(category.id)}
                    >
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

export default CategoryComponent;
