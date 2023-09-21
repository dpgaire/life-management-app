const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const TaskModel = require("../models/Task");
const verifyToken = require("../middlewares/auth");

// Create a new task
router.post(
  "/",
  [
    body("name", "Task name is required").notEmpty(),
    body("description", "Task description is required").notEmpty(),
    body("status", "Task status is required").notEmpty(),
    body("category_ids").custom((value) => {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error("Category IDs must be an array and cannot be empty");
      }
      return true;
    }),
  ],
  verifyToken,
  async (req, res) => {
    const { name, description, status, category_ids } = req.body;
    const user_id = req.userId; // Get the user ID from the token

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTask = await TaskModel.createTask(
        name,
        description,
        status,
        user_id,
        category_ids
      );
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error_message: "Error creating task" });
    }
  }
);

// Get tasks for a specific user
router.get("/", verifyToken, async (req, res) => {
  const user_id = req.userId; // Get the user ID from the token

  try {
    const tasks = await TaskModel.getTasks(user_id);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_message: "Error fetching tasks" });
  }
});

// Update a task
router.put("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, status, category_ids } = req.body;
  const user_id = req.userId; // Get the user ID from the token

  try {
    const updatedTask = await TaskModel.updateTask(
      id,
      name,
      description,
      status,
      user_id,
      category_ids
    );

    if (!updatedTask) {
      res.status(404).json({ error_message: "Task not found" });
    } else {
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_message: "Error updating task" });
  }
});

// Delete a task
router.delete("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const user_id = req.userId; // Get the user ID from the token

  try {
    const deletedTask = await TaskModel.deleteTask(id, user_id);
    if (!deletedTask) {
      res.status(404).json({ error_message: "Task not found" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_message: "Error deleting task" });
  }
});

module.exports = router;
