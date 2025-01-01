const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
  body('title').isLength({ min: 3 }).withMessage('Enter a valid title'),
  body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, tag = "" } = req.body;

  try {
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a newNote object
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    // Find the note by ID
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check if the logged-in user is the owner of the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authorized to update this note");
    }

    // Update the note
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
      // Find the note by ID
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found");
      }
  
      // Check if the logged-in user is the owner of the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not authorized to delete this note");
      }
  
      // Delete the note
      await Note.findByIdAndDelete(req.params.id);
  
      res.json({ message: "Note deleted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = router;