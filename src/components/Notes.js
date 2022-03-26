import React, { useContext, useEffect } from "react";
import NoteContext from "../Context/notes/NoteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
const Notes = (props) => {
  let navigator = useNavigate();
  const { Notes, fetchNotes } = useContext(NoteContext);
  useEffect(() => {
    if(localStorage.getItem('authToken')){

      fetchNotes();
    }else{
      navigator('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <h2>Your Notes</h2>
    <div className="container row my-3">
      {Notes.length===0?'No notes to display':Notes.map((val) => {
        return (<NoteItem showAlert={props.showAlert} key= {val._id} data={val} />);
        })}
    </div>
    </>
  );
};

export default Notes;
