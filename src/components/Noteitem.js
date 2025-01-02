import React, { useState, useEffect } from 'react';
import Noteitem from './Noteitem'; // Import Noteitem component

const Notes = (props) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from the database or API
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const updateNote = (note) => {
    // Update the note in the database or API (implement your logic here)
    console.log('Update note:', note);
  };

  const handleClick = () => {
    // Example placeholder logic to add a new note
    const newNote = {
      _id: new Date().toISOString(),
      title: 'New Note',
      content: 'This is a new note',
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
          {notes.map((note) => (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          ))}
        </div>
      </div>
      <button onClick={handleClick} type="button">
        Add Note
      </button>
    </div>
  );
};

export default Notes;
