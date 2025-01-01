import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"; // Backend URL
  const authToken = localStorage.getItem("token"); // Retrieve token from localStorage

  const [notes, setNotes] = useState([]); // State to hold notes

  // Function to fetch notes from the backend
  const fetchNotes = async () => {
    if (!authToken) {
      console.error("No auth token found!");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();
      setNotes(data); // Update the state with fetched notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Function to add a new note
  const addNote = async (title, description, tag) => {
    if (!title || !description) {
      alert("Title and Description cannot be empty!");
      return;
    }

    const newNote = {
      title,
      description,
      tag: tag || "General",
    };

    if (!authToken) {
      console.error("No auth token found!");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const note = await response.json();
      setNotes((prevNotes) => [...prevNotes, note]); // Add new note to the state
      console.log("Note added successfully:", note);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Function to delete a note by ID
  const deleteNote = async (id) => {
    if (!authToken) {
      console.error("No auth token found!");
      return;
    }

    try {
      // Make the DELETE request to the backend
      const response = await fetch(`${host}/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      // Remove the deleted note from the frontend state
      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
      console.log("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // UseEffect to fetch notes on component mount
  useEffect(() => {
    fetchNotes(); // Fetch notes when the component mounts
  }, []);

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
