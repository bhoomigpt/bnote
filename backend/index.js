const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for all origins (or specify the origin if you need to restrict it)

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notesApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Sample Note Schema
const Note = mongoose.model('Note', new mongoose.Schema({
  title: String,
  description: String,
  tag: String
}));

// API Routes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).send('Error fetching notes');
  }
});

app.post('/api/notes', async (req, res) => {
  const { title, description, tag } = req.body;
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

app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
