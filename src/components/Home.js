import React, { useState, useEffect } from 'react';
import AddNote from './AddNote';
import NoteItem from './Noteitem';

const BASE_URL = "http://localhost:5000/api"; // Your backend API URL

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  // Fetch notes from the API
  const fetchNotes = async () => {
    const token = localStorage.getItem('auth-token'); // Get auth token from localStorage
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token, // Include token if needed
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched Notes:', data); // Log the fetched notes
      setNotes(data); // Set notes state with the fetched data
    } else {
      console.error('Failed to fetch notes:', response.statusText);
    }
  };

  // Add note via API
  const addNote = async (title, description, tag) => {
    const token = localStorage.getItem('auth-token');
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNote = await response.json();
    setNotes([...notes, newNote]);
  };

  // Delete note via API
  const deleteNote = async (id) => {
    const token = localStorage.getItem('auth-token');
    await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    setNotes(notes.filter((note) => note._id !== id)); // Remove deleted note from state
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  // Fetch notes when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <AddNote note={note} handleChange={handleChange} addNote={addNote} />
      <h2>Your Notes</h2>
      <div>
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

export default Home;
