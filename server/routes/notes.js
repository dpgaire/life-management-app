const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const NoteModel = require("../models/Note");
const verifyToken = require("../middlewares/auth");

// Create a new note
router.post(
  "/",
  [
    body("title", "Note title is required").notEmpty(),
    body("content", "Note content is required").notEmpty(),
    body("category_ids").custom((value) => {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error("Category IDs must be an array and cannot be empty");
      }
      return true;
    }),
  ],
  verifyToken,
  async (req, res) => {
    const { title, content, category_ids } = req.body;
    const user_id = req.userId; // Get the user ID from the token

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newNote = await NoteModel.createNote(
        title,
        content,
        user_id,
        category_ids
      );
      res.status(201).json(newNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error_message: "Error creating note" });
    }
  }
);

// Get notes for a specific user
router.get("/", verifyToken, async (req, res) => {
  const user_id = req.userId; // Get the user ID from the token

  try {
    const notes = await NoteModel.getNotes(user_id);
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_message: "Error fetching notes" });
  }
});

// Update a note
router.put("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, category_ids } = req.body;
  const user_id = req.userId; // Get the user ID from the token

  try {
    const updatedNote = await NoteModel.updateNote(
      id,
      title,
      content,
      user_id,
      category_ids
    );

    if (!updatedNote) {
      res.status(404).json({ error_message: "Note not found" });
    } else {
      res.status(200).json(updatedNote);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_message: "Error updating note" });
  }
});

// Delete a note
router.delete("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const user_id = req.userId; // Get the user ID from the token

  try {
    const deletedNote = await NoteModel.deleteNote(id, user_id);
    if (!deletedNote) {
      res.status(404).json({ error_message: "Note not found" });
    } else {
      res.status(200).json({ message: "Note deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_message: "Error deleting note" });
  }
});

module.exports = router;
