import React from "react";
import { useContext, useEffect } from "react";
import ContextForNote from "../Context/notes/NoteContext";
import contextforAlert from "../Context/alerts/AlertContext";
import { useNavigate } from "react-router-dom";

const FetchNote = (props) => {
 let navigate = useNavigate();

  let {data, setdata, DeleteNote,FetchNotes} = useContext(ContextForNote);
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      FetchNotes();
    }
    else{
navigate('/login')
    }
  }, [])


  return (
    <>{

    <div className="row">

      {
        data.map((value)=>{
          
          return   <div className="col-md-4 "key={value._id}> <div className="card my-3"  style={{ width: "18rem" }}>
            <div className="card-body">
            <h5 className="card-title">{value.title}</h5>
            <p className="card-text">{value.description}</p>
            <div className="d-flex">
            <i className="fa-sharp fa-solid fa-trash me-3"onClick={()=>{DeleteNote(value._id)}}></i>
            <i className="fa-sharp fa-solid fa-pen-to-square" onClick={()=>{props.funcForUpdate(value)}}></i>
        
            </div>
          </div>
        </div>
        </div>
        })
      }
    
    </div>

    }
    </>
  );
};

export default FetchNote;
