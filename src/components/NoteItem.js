import React from "react";

const NoteItem = (props) => {
  let { title, desciption } = props.data;
  return (
    <div className="card col-md-3 mx-3 my-3">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {desciption}
        </p>
      </div>
    </div>
  );
};

export default NoteItem;
