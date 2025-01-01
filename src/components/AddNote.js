import React, { useContext, useState } from "react";
import NoteContext from "../context/noteContext";

const AddNote = () => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="my-3">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="form-control mb-2"
        value={note.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="form-control mb-2"
        value={note.description}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="tag"
        placeholder="Tag"
        className="form-control mb-2"
        value={note.tag}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary w-100">
        Add Note
      </button>
    </form>
  );
};

export default AddNote;
