
import './App.css';

import About from './components/About';
import Navbar from './components/Navbar';
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Note from './components/Note';
import NoteContext from './Context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import AlertState from './Context/alerts/AlertState';





function App() {



  return (
    <>
  

<AlertState>
 <NoteContext>
    <BrowserRouter>
    <Navbar title = "iNoteBook"></Navbar>
    <Alert ></Alert>
    <Routes>
      <Route exact path='/' element={<div className='container my-5'>
    <Note></Note>
    </div>}></Route>
      <Route exact path='/About' element={<About/>}></Route>
      <Route exact path='/login' element={<Login></Login>}></Route>
      <Route exact path='/signup' element={<Signup></Signup>}></Route>
    </Routes>
    </BrowserRouter>
  </NoteContext>
    </AlertState>
    </>
  );
}

export default App;
