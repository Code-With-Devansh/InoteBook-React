import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import NoteItem from "./NoteItem";
const Notes = () => {
  const { Notes, setNotes } = useContext(NoteContext);
  return (
    <div className="row my-3">
      {Notes.map((val) => {
        return (<NoteItem data={val} />);
        })}
    </div>
  );
};

export default Notes;
