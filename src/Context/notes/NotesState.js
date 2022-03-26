import NoteContext from "./NoteContext";
import React, { useState } from "react";
const NotesState = (props) => {
  let host = "http://localhost:5000";
  let arr = [];
  const [Notes, setNotes] = useState(arr);
  let fetchNotes = async () => {
    let notes = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
        localStorage.getItem('authToken'),
        'Content-Type':'application/json'
      },
    });
    let Notearr = await notes.json();
    setNotes(Notearr);
  };

  // add a note
  let addNote = async (note) => {
    let response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token":
        localStorage.getItem('authToken'),
        'Content-Type':'application/json'
      },
      body: JSON.stringify(note),
    });
    let res = await response.json();
    setNotes(Notes.concat(res));
  };
  // Delete a note
  let deleteNote = async(id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
        localStorage.getItem('authToken'),
      },
    });
    setNotes(
      Notes.filter((val) => {
        return val._id !== id;
      })
    );
  };
  // edit a note
  let editNote = async (id, data) => {
    // to do api calls
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token":localStorage.getItem('authToken'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let { title, description, tag } = data;
    for (let index = 0; index < Notes.length; index++) {
      const element = Notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesState;
