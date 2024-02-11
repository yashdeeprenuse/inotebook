import contextforAlert from "../alerts/AlertContext";
import ContextForNote from "./NoteContext";
import { useContext, useEffect, useState } from "react";

let NoteContext = (props) => {

let alertvalue = useContext(contextforAlert);


let [data, setdata] = useState([]);
let token = localStorage.getItem("token");


//fetching data from local api
const FetchNotes = async ()=>{
 
 let firstdata = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
      method:"GET",
      headers: {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      }
    });
let finaldata = await firstdata.json();
setdata(finaldata);
return finaldata;

}

//adding new note only from client side
const addNewNote =async (title, description,tag) => {
  
  let addclientnote = await fetch("http://localhost:5000/api/notes/addnote", {
    method:"POST",
      headers: {
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem("token")
      },
      body:JSON.stringify({title, description,tag})
      // we can't send the json diretly we will encounter error we have to send in above format only.
  })

  let acn = await addclientnote.json();

  setdata(data.concat(acn))
    
  };

//deleting note from client side and server side
const DeleteNote = async(id) => {

const deleteit = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
  method:"DELETE",
      headers: {
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem("token")
      }
})

const alertme = await deleteit.json();


let afterDeleteData = await FetchNotes();
setdata(afterDeleteData);


//client side deletion
const afterNote = data.filter((value) => {
  if (value._id !== id) {
    return value;
  }
});

alertvalue.alertfunc("Note Deleted", "success")


  };

//updating a existing note
const ModalUpdateNote = async (id, title, description, tag)=>{

const eNote = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
  method:"PUT",
      headers: {
        "Content-Type":"application/json",
        "auth-token": localStorage.getItem("token")
      },
      body:JSON.stringify({title, description, tag})
})

let enotevalue =await eNote.json();

let enotelist = await FetchNotes();

setdata(enotelist);

alertvalue.alertfunc("Note Updated", "success")

}

  return (
    <ContextForNote.Provider value={{ data, setdata,token,  addNewNote, DeleteNote, FetchNotes, ModalUpdateNote}}>
      {props.children}
    </ContextForNote.Provider>
  );
};

export default NoteContext;
