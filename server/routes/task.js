const express = require("express");
const router = express.Router();
const taskModel = require("../models/Task");

router.post("/", async (req, res) => {
  const { title, completed } = req.body;
  const userId = req.userId; // Get the user ID from the middleware

  try {
    const newTask = await taskModel.createTask(title, completed, userId); // Pass the user ID to the model function
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

router.get("/", async (req, res) => {
  const user_id = req.userId; // Use the user ID from the token
  try {
    const tasks = await taskModel.getTasks(user_id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const user_id = req.userId; // Use the user ID from the token
  try {
    const updatedTask = await taskModel.updateTask(
      id,
      title,
      completed,
      user_id
    );
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user_id = req.userId; // Use the user ID from the token
  try {
    const deletedTask = await taskModel.deleteTask(id, user_id);
    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
