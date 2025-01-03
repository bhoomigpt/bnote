require('dotenv').config();  // To read from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for all origins

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notesApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Sample Note Schema
const Note = mongoose.model('Note', new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true }
}));

// API Routes

// Get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).send('Error fetching notes');
  }
});

// Add a new note
app.post('/api/notes', async (req, res) => {
  const { title, description, tag } = req.body;

  // Basic validation
  if (!title || !description || !tag) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newNote = new Note({
      title,
      description,
      tag
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).send('Error saving note');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
