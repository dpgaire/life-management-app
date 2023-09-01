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

const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const token = useSelector((state) => state.auth.token); //


  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/tasks", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          userId: token,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditTask = (taskId) => {
    setEditedTaskId(taskId);
  };

  const handleAddTask = async () => {
    // if (newTaskTitle.trim() === "") return;

    try {
      const response = await fetch("http://localhost:3002/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ title: newTaskTitle }),
      });

      if (response.status === 201) {
        setNewTaskTitle("");
        fetchTasks();
      } else {
        console.error("Error adding task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (id) => {
    if (!editedTaskId) return;

    const editedTask = tasks.find((task) => task.id === editedTaskId);

    try {
      const response = await fetch(`http://localhost:3002/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(editedTask),
      });

      if (response.status === 200) {
        setEditedTaskId(null);
        fetchTasks();
      } else {
        console.error("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token
        },
      });

      if (response.status === 204) {
        fetchTasks();
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Task Management
        </Typography>
        <TextField
          label="Task"
          fullWidth
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tasks</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    {editedTaskId === task.id ? (
                      <TextField
                        value={task.title}
                        onChange={(e) =>
                          setTasks((prevTasks) =>
                            prevTasks.map((prevTask) =>
                              prevTask.id === task.id
                                ? { ...prevTask, title: e.target.value }
                                : prevTask
                            )
                          )
                        }
                      />
                    ) : (
                      task.title
                    )}
                  </TableCell>
                  <TableCell>
                    {editedTaskId === task.id ? (
                      <Button
                        onClick={() => handleUpdateTask(task.id)}
                        color="primary"
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton onClick={() => handleEditTask(task.id)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteTask(task.id)}>
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

export default TaskComponent;
