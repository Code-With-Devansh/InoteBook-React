import React, { useContext, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";

const NoteItem = (props) => {
  let { title, description, tag, _id } = props.data;
  const [Note, setNote] = useState({ title, description, tag });
  const { deleteNote, editNote } = useContext(NoteContext);
  let handleDelete = () => {
    deleteNote(_id);
    props.showAlert("success", "The Note has been deleted successfully");
  };
  let handleClick = (e) => {
    if (Note.tag === "") {
      Note.tag = "Default";
    }
    editNote(_id, Note);
    props.showAlert("success", "The note has been updated successfully");
  };
  let handleOnChange = (event) => {
    setNote({ ...Note, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure want to delete this note with title: {title}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card col-md-3 mx-3 my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{title}</h5>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              style={{
                border: "0px",
                background: "white",
              }}
            >
              <i className="fa-solid fa-trash-can mx-2 "></i>
            </button>

            {/* -------------------------------------------------------------------------------------- */}

            <div
              className="modal fade"
              id="EditModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit the Note
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
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
                          name="title"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={Note.description}
                          onChange={handleOnChange}
                          name="description"
                          id="description"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                          Tag:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={Note.tag}
                          onChange={handleOnChange}
                          name="tag"
                          id="tag"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleClick}
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                      disabled={(Note.title.length < 3 || Note.description.length < 5)}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#EditModal"
            >
              <i className="fa-regular fa-pen-to-square mx-2"></i>
            </button>
          </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
