import React, { useState } from 'react';
import AddNote from './AddNote';
import Notes from './Notes';

const Home = () => {
  const [notes, setNotes] = useState([
    { _id: 1, title: 'Wake Up Early', description: 'Set the alarm and wake up by 6 AM', tag: 'personal' },
    { _id: 2, title: 'Workout', description: 'Complete a 30-minute workout session', tag: 'fitness' },
    { _id: 3, title: 'Meeting', description: 'Team meeting at 10 AM via Zoom', tag: 'work' },
    { _id: 4, title: 'Shopping', description: 'Buy groceries for the week', tag: 'personal' },
    { _id: 5, title: 'Read Book', description: 'Finish 20 pages of Atomic Habits', tag: 'learning' },
  ]);

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: 'auto',
      padding: '20px',
    },
    card: {
      width: '18rem',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
    cardTitle: {
      fontWeight: 'bold',
      color: '#333',
    },
    cardText: {
      fontSize: '0.9rem',
      color: '#555',
    },
    cardTag: {
      fontSize: '0.8rem',
      fontStyle: 'italic',
      color: '#777',
    },
    icon: {
      cursor: 'pointer',
      fontSize: '1.2rem',
    },
    iconEdit: {
      color: '#007bff',
    },
    iconDelete: {
      color: '#dc3545',
    },
    notesGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'start',
    },
  };

  return (
    <div style={styles.container}>
      <AddNote addNote={(note) => setNotes([...notes, { ...note, _id: Date.now() }])} />
      <h2>Your Notes</h2>
      <div style={styles.notesGrid}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style = { ...styles.card, ...styles.cardHover })}
              onMouseLeave={(e) => (e.currentTarget.style = { ...styles.card })}
            >
              <div>
                <h5 style={styles.cardTitle}>{note.title}</h5>
                <p style={styles.cardText}>{note.description}</p>
                <p style={styles.cardTag}>Tag: {note.tag || 'General'}</p>
                <div className="d-flex justify-content-between">
                  <span
                    style={{ ...styles.icon, ...styles.iconEdit }}
                    title="Edit"
                  >
                    ✏️
                  </span>
                  <span
                    style={{ ...styles.icon, ...styles.iconDelete }}
                    title="Delete"
                    onClick={() => setNotes(notes.filter((n) => n._id !== note._id))}
                  >
                    🗑️
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No notes to display</p>
        )}
      </div>
    </div>
  );
};

export default Home;
