const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const expenseModel = require("../models/Expense");

router.post("/",[
  body("item", "Item is required").notEmpty(),
  body("amount", "Amount is required").notEmpty(),
], async (req, res) => {
  const { item, amount } = req.body;
  const userId = req.userId; // Get the user ID from the middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newExpense = await expenseModel.createExpense(item, amount,userId);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error creating expense" });
  }
});

router.get("/", async (req, res) => {
  const userId = req.userId; // Get the user ID from the middleware

  try {
    const expenses = await expenseModel.getExpenses(userId);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { item, amount } = req.body;
  const userId = req.userId; // Use the user ID from the token

  try {
    const updatedExpense = await expenseModel.updateExpense(id, item, amount,userId);
    if (!updatedExpense) {
      res.status(404).json({ message: "Expense not found" });
    } else {
      res.status(200).json(updatedExpense);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating expense" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user_id = req.userId; // Use the user ID from the token
  
  try {
    const deletedExpense = await expenseModel.deleteExpense(id,user_id);
    if (!deletedExpense) {
      res.status(404).json({ message: "Expense not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense" });
  }
});

module.exports = router;
