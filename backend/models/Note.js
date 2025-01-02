const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST a new note
router.post('/', async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    const newNote = new Note({
      title,
      description,
      tag,
    });
    await newNote.save();
    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
