import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const NoteItem = ({ note, deleteNote }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note._id); // Call deleteNote to delete from both frontend and backend
    }
  };

  return (
    <div className="card" style={{ width: "18rem", padding: "10px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#ffffff" }}>
      <div className="card-body">
        <h5 className="card-title" style={{ fontWeight: "bold", color: "#333" }}>{note.title}</h5>
        <p className="card-text" style={{ fontSize: "0.9rem", color: "#555" }}>{note.description}</p>
        <p style={{ fontSize: "0.8rem", fontStyle: "italic", color: "#777" }}>
          Tag: {note.tag || "General"}
        </p>
        <div className="d-flex justify-content-between">
          <FaEdit style={{ color: "#007bff", cursor: "pointer", fontSize: "1.2rem" }} title="Edit" />
          <FaTrashAlt style={{ color: "#dc3545", cursor: "pointer", fontSize: "1.2rem" }} title="Delete" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

