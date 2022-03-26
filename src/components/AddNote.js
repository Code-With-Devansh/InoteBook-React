import React, { useContext, useState } from "react";

import NoteContext from "../Context/notes/NoteContext";

const AddNote = (props) => {
  const { addNote } = useContext(NoteContext);
  let handleClick = (e) => {
    e.preventDefault();
    if(Note.tag === ''){
      Note.tag = 'Default'
    }
    addNote({
      ...Note,
    });
    setNote({
      title:'',
      description:'',
      tag:''
    });
    props.showAlert('success', 'The note has been added successfully')
  };
  const [Note, setNote] = useState({
    title:'',
    description:'',
    tag:''
  })
  let handleOnChange = (event) => {
    setNote({...Note, [event.target.name]:event.target.value})
  };
  return (
    <div className="my-3">
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title: 
          </label>
          <input
          value={Note.title}
            type="text"
            className="form-control"
            id="title"
            onChange={handleOnChange}
            name = 'title'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description"  className="form-label">
            Description:
          </label>
          <input type="text" className="form-control" value={Note.description} onChange={handleOnChange} name="description" id="description"/>
        </div>



        <div className="mb-3">
          <label htmlFor="tag"  className="form-label">
            Tag:
          </label>
          <input type="text" className="form-control" value={Note.tag} onChange={handleOnChange} name="tag" id="tag" />
        </div>
        <button type="submit" disabled={(Note.title.length < 3 || Note.description.length < 5)} onClick={handleClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
