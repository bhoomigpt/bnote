const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser'); // Fetchuser middleware ka correct path
const Note = require('../models/Note');

// Route 1: Fetch all notes
router.get('/', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Other routes can be added here

module.exports = router;
