import React, { useEffect, useState, useRef} from "react";
import FetchNote from "./FetchNote";
import NoteContext from "../Context/notes/NoteState";
import { useContext } from "react";
import ContextForNote from "../Context/notes/NoteContext";
import { click } from "@testing-library/user-event/dist/click";
import contextforAlert from "../Context/alerts/AlertContext";
import { useNavigate } from "react-router-dom";

const Note = (props) => {

const alertvalues = useContext(contextforAlert);

  //code for adding new note
  const { addNewNote } = useContext(ContextForNote);

  const [ClientNote, setClientNote] = useState({ title: "", description: "", tag:"" });

  let handelOnChange = (e) => {
    setClientNote({ ...ClientNote, [e.target.name]: e.target.value });
  };

  const handelOnClick = (e) => {
    e.preventDefault();
    addNewNote(ClientNote.title, ClientNote.description,ClientNote.tag);
    setClientNote({title: "", description: "", tag:""});
    alertvalues.alertfunc("New Note Added", "success")
  };


//code for updating note


const {ModalUpdateNote} =useContext(ContextForNote);

  const ref = useRef(null);
  const ref2 = useRef(null);
  

  
  let[eNote, eSetNote] = useState("") 
 

const updateNote = (currentNote)=>{
  ref.current.click();
 eSetNote(currentNote);
 
}  


const ehandelOnChange = (e)=>{
  eSetNote({...eNote, [e.target.id] : e.target.value})
}

let endUpdateProcess =(e)=>{
  const id = eNote._id;
  ModalUpdateNote(id, eNote.title, eNote.description, eNote.tag)
  ref2.current.click();
}

return (
    <>
      <h1>Create a New Note</h1>
      
      <div className="mb-3 my-4">
        <label htmlFor="atitle" className="form-label">
         <span>Title</span><span>
       { (ClientNote.title.length>=1 && ClientNote.title.length<=2)?  <span className="badge text-bg-danger mx-2">Min 3 Char</span>  : <span className="badge text-bg-secondary d-none">4</span>}
        </span>
        </label>
        <input
          type="text"
          className="form-control"
          name="title"
          id="atitle"
          placeholder=""
          value = {ClientNote.title}
          onChange={handelOnChange}
        />
       
      </div>
      <div className="mb-3">
        <label htmlFor="adescription" className="form-label">
        <span>Description</span><span>
       { (ClientNote.description.length>=1 && ClientNote.description.length<=3)?  <span className="badge text-bg-danger mx-2">Min 4 Char</span>  : <span className="badge text-bg-secondary d-none">4</span>}
        </span>
        </label>
        <textarea
          className="form-control"
          id="adescription"
          name="description"
          rows="3"
          value={ClientNote.description}
          onChange={handelOnChange}
        ></textarea>
      </div>
      <div className="mb-3 my-4">
        <label htmlFor="atag" className="form-label">
        <span>Tag</span><span>
       { (ClientNote.tag.length>=1 && ClientNote.tag.length<=2)?  <span className="badge text-bg-danger mx-2">Min 3 Char</span>  : <span className="badge text-bg-secondary d-none">4</span>}
        </span>
        </label>
        <input
          type="text"
          className="form-control"
          name="tag"
          id="atag"
          placeholder=""
          value={ClientNote.tag}
          onChange={handelOnChange}
        />
      </div>
      
      <button className="btn btn-primary" disabled={(ClientNote.description.length <=3 || ClientNote.description.length===0 || ClientNote.tag.length<=2 || ClientNote.tag.length===0 || ClientNote.title.length<=2 || ClientNote.title.length===0)} onClick={handelOnClick}>
        Create
      </button>
      <h1 className="mt-5">Your Notes</h1>

<button type="button" style={{display:"none"}} ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note Here</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3 my-4">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          name="etitle"
          id="title"
          placeholder=""
          value={eNote.title}
          onChange={ehandelOnChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descrpition
        </label>
        <textarea
          className="form-control"
          id="description"
          name="edescription"
          rows="3"
          value={eNote.description}
          onChange={ehandelOnChange}
        ></textarea>
      </div>
      <div className="mb-3 my-4">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          name="etag"
          id="tag"
          placeholder=""
          value={eNote.tag}
          onChange={ehandelOnChange}
        />
      </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={ref2} data-bs-dismiss="modal">Close</button>
        <button   type="button" className="btn btn-primary" onClick={endUpdateProcess}>Update Note</button>
      </div>
    </div>
  </div>
</div>

      <FetchNote funcForUpdate={updateNote}></FetchNote>
    </>
  );
};

export default Note;
