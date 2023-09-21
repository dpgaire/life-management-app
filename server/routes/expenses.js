const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const ExpenseModel = require("../models/Expense");
const verifyToken = require("../middlewares/auth");

// Create a new expense
router.post(
  "/",
  [
    body("item", "Item name is required").notEmpty(),
    body("price", "Price is required").isFloat(),
    body("quantity", "Quantity is required").isInt(),
    body("category_ids").custom((value) => {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error("Category IDs must be an array and cannot be empty");
      }
      return true;
    }),
  ],
  verifyToken,
  async (req, res) => {
    const { item, price, quantity, category_ids } = req.body;
    const user_id = req.userId; // Get the user ID from the token

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newExpense = await ExpenseModel.createExpense(
        item,
        price,
        quantity,
        user_id,
        category_ids
      );
      res.status(201).json(newExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error_message: "Error creating expense" });
    }
  }
);

// Get expenses for a specific user
router.get("/", verifyToken, async (req, res) => {
  const user_id = req.userId; // Get the user ID from the token

  try {
    const expenses = await ExpenseModel.getExpenses(user_id);
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_message: "Error fetching expenses" });
  }
});

// Update an expense
router.put("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { item, price, quantity, category_ids } = req.body;
  const user_id = req.userId; // Get the user ID from the token

  try {
    const updatedExpense = await ExpenseModel.updateExpense(
      id,
      item,
      price,
      quantity,
      user_id,
      category_ids
    );

    if (!updatedExpense) {
      res.status(404).json({ error_message: "Expense not found" });
    } else {
      res.status(200).json(updatedExpense);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_message: "Error updating expense" });
  }
});

// Delete an expense
router.delete("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const user_id = req.userId; // Get the user ID from the token

  try {
    const deletedExpense = await ExpenseModel.deleteExpense(id, user_id);
    if (!deletedExpense) {
      res.status(404).json({ error_message: "Expense not found" });
    } else {
      res.status(200).json({ message: "Expense deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_message: "Error deleting expense" });
  }
});

module.exports = router;
