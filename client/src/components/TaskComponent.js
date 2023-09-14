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
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../store/actions/taskAction";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import useAuth from "../hooks/useAuth";
import { TASKS_LIST_SUCCESS } from "../store/types/taskTypes";
// import { getTasks, addTask, updateTask, deleteTask } from "../store/actions/taskAction"; // Import the specific action creators

const TaskComponent = () => {
  const dispatch = useDispatch();
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [updateTaskTitle, setUpdateTaskTitle] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const token = useSelector((state) => state.auth.token); //
  const tasks = useSelector((state) => state.task.data);
  const loading = useSelector((state) => state.task.loading);

  const error = useSelector((state) => state.task.error);
  // const tasks = useSelector((state) => state.tasksList.data); // Use the correct state slice
  // const loading = useSelector((state) => state.tasksList.loading); // Use the correct state slice
  // const error = useSelector((state) => state.tasksList.error); // 
  const deleteLoading = useSelector((state) => state.deleteTask.loading); // 

  // const deleteLoading = useSelector((state) => state.tasksList.delete));
  useAuth();

  useEffect(() => {
    dispatch(getTasks(token));
    // dispatch(addTask(null));
  }, [dispatch, token]);

  const handleEditTask = (taskId) => {
    setEditedTaskId(taskId);
  };

  const handleAddTask = async () => {
    // dispatch(addTask(token, { title: newTaskTitle }));
    // dispatch(getTasks(token));
    try {
      dispatch(addTask(token, { title: newTaskTitle })); // Dispatch the addTask action
      setNewTaskTitle(""); // Clear the input field
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // const handleUpdateTask = async (id) => {
  //   if (!editedTaskId) return;
  //   const editedTask = updateTaskTitle.find((task) => task.id === editedTaskId);
  //   dispatch(updateTask(id, editedTask, token));

  //   // const editedTask = tasks.find((task) => task.id === editedTaskId);

  //   try {
  //     const response = await fetch(`http://localhost:3002/api/tasks/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token,
  //       },
  //       body: JSON.stringify(editedTask),
  //     });

  //     if (response.status === 200) {
  //       setEditedTaskId(null);
  //       // fetchTasks();
  //     } else {
  //       console.error("Error updating task");
  //     }
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };

  const handleUpdateTask = async (id, updatedTitle) => {
    try {
      dispatch(updateTask(token, id, updatedTitle)); // Dispatch the updateTask action
      setEditedTaskId(null); // Clear the edited task ID
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const handleDeleteTask = async (id) => {
    dispatch(deleteTask(id, token));
    // dispatch(getTasks(token));
  };

  // const handleDeleteTask = async (id) => {
  //   try {
  //     dispatch(deleteTask(id,token)); // Dispatch the deleteTask action
  //     // dispatch(getTasks(token));
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };


  return (
    <div>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Task Management
        </Typography>
        {error && <ErrorMessage error={error} />}
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
          loading={loading}
          style={{ marginTop: "10px" }}
          onClick={handleAddTask}
        >
          Add Task
        </Button>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          {loading || deleteLoading ? (
            <Loading />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tasks</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              {tasks?.length > 0 ? (
                tasks?.map((task) => (
                  <TableBody key={task.id}>
                    <TableRow>
                      <TableCell>
                        {editedTaskId === task.id ? (
                          <TextField
                            value={task.title || ""}
                            // onChange={(e) => setUpdateTaskTitle(e.target.value)}
                          />
                        ) : (
                          task.title
                        )}
                      </TableCell>
                      <TableCell>
                        {editedTaskId === task.id ? (
                          <Button
                            onClick={() => handleUpdateTask(task.id,tasks)}
                            color="primary"
                          >
                            Save
                          </Button>
                        ) : (
                          <IconButton
                            loading={loading}
                            onClick={() => handleEditTask(task.id)}
                          >
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
                  </TableBody>
                ))
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: "center", width: "100%" }}>
                      No record found!
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          )}
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TaskComponent;
