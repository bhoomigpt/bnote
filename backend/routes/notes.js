// Notes.js (Frontend - React)

import React, { useState, useEffect } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any fetch errors

  // Fetch notes from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setNotes(data);
        setLoading(false); // Set loading to false after the data is fetched
      })
      .catch(error => {
        setError(error.message); // If an error occurs during fetch
        setLoading(false); // Stop loading
      });
  }, []); // Empty dependency array means it runs once when the component mounts

  if (loading) {
    return <p>Loading notes...</p>; // Show loading message while fetching
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message if fetching fails
  }

  return (
    <div>
      <h2>Notes</h2>
      {notes.length > 0 ? (
        <div className="note-list">
          {notes.map((note) => (
            <div key={note._id} className="note-item">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <span>{note.tag || "General"}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
};

export default Notes;
