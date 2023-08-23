const express = require("express");
const router = express.Router();
const noteModel = require("../models/Note");
const verifyToken = require("../middlewares/auth");

// Create a new note
router.post("/", verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const user_id = req.userId; // Get the user ID from the token

  try {
    const newNote = await noteModel.createNote(title, content, user_id);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
});

// Get notes for a specific user
router.get("/", verifyToken, async (req, res) => {
  const user_id = req.userId; // Get the user ID from the token

  try {
    const notes = await noteModel.getNotes(user_id);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// Update a note
router.put("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const user_id = req.userId; // Get the user ID from the token

  try {
    const updatedNote = await noteModel.updateNote(id, title, content, user_id);
    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
    } else {
      res.status(200).json(updatedNote);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating note" });
  }
});

// Delete a note
router.delete("/:id", verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const user_id = req.userId; // Get the user ID from the token

  try {
    const deletedNote = await noteModel.deleteNote(id, user_id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

module.exports = router;
