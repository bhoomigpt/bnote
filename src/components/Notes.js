import React, { useState } from 'react';
import AddNote from './AddNote';
import NoteItem from './Noteitem';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const addNote = (title, description, tag) => {
    const newNote = {
      title,
      description,
      tag,
      _id: Date.now(), // Assign a unique id using timestamp
    };
    setNotes([...notes, newNote]); // Add new note to state
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note._id !== id)); // Delete note by id
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  return (
    <div>
      <AddNote note={note} handleChange={handleChange} addNote={addNote} />
      <div className="note-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem key={note._id} note={note} deleteNote={deleteNote} />
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
};

export default Notes;
