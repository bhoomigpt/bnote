const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');  // Middleware to ensure user is logged in
const Note = require('../models/Note');  // Note model
const { body, validationResult } = require('express-validator');

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
  body('title').isLength({ min: 3 }).withMessage('Enter a valid title'),  // Title must be at least 3 characters
  body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),  // Description must be at least 5 characters
], async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract the note details from the request body
  const { title, description, tag = "" } = req.body;

  try {
    // Create a new note linked to the logged-in user
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id  // Ensure that the note is linked to the authenticated user
    });

    // Save the note to the database
    const savedNote = await note.save();
    
    // Log the saved note (optional for debugging)
    console.log(savedNote);
    
    // Respond with the saved note
    res.json(savedNote);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });  // Send error if something goes wrong
  }
});

module.exports = router;
