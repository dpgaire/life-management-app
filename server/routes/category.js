const express = require("express");
const router = express.Router();
const categoryModel = require("../models/Category");

router.post("/", async (req, res) => {
  const { name } = req.body;
  const user_id = req.userId;
  try {
    const newCategory = await categoryModel.createCategory(
      name,
      user_id
    );
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
});

router.get("/", async (req, res) => {
  const user_id = req.userId;
  try {
    const categories = await categoryModel.getCategories(user_id);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const user_id = req.userId;

  try {
    const updatedCategory = await categoryModel.updateCategory(
      id,
      name,
      user_id
    );
    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found." });
    } else {
      res.status(200).json(updatedCategory);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user_id = req.userId;
  try {
    const deletedCategory = await categoryModel.deleteCategory(id, user_id);
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(204).json({ message: "Category not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
