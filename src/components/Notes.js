import React, { useState } from 'react';
import AddNote from './AddNote';
import NoteItem from './Noteitem';

const Notes = () => {
  // Initializing notes state with 12 predefined notes
  const [notes, setNotes] = useState([
    { title: 'Note 1', description: 'This is the first note', tag: 'work', _id: Date.now() + 1 },
    { title: 'Note 2', description: 'This is the second note', tag: 'personal', _id: Date.now() + 2 },
    { title: 'Note 3', description: 'This is the third note', tag: 'study', _id: Date.now() + 3 },
    { title: 'Note 4', description: 'This is the fourth note', tag: 'work', _id: Date.now() + 4 },
    { title: 'Note 5', description: 'This is the fifth note', tag: 'work', _id: Date.now() + 5 },
    { title: 'Note 6', description: 'This is the sixth note', tag: 'personal', _id: Date.now() + 6 },
    { title: 'Note 7', description: 'This is the seventh note', tag: 'study', _id: Date.now() + 7 },
    { title: 'Note 8', description: 'This is the eighth note', tag: 'work', _id: Date.now() + 8 },
    { title: 'Note 9', description: 'This is the ninth note', tag: 'personal', _id: Date.now() + 9 },
    { title: 'Note 10', description: 'This is the tenth note', tag: 'work', _id: Date.now() + 10 },
    { title: 'Note 11', description: 'This is the eleventh note', tag: 'study', _id: Date.now() + 11 },
    { title: 'Note 12', description: 'This is the twelfth note', tag: 'personal', _id: Date.now() + 12 }
  ]);

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
