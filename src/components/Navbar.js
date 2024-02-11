import React, { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Navbar = (props) => {
  let navigate = useNavigate();
 let ref= useRef();

  let handelLogout = (e)=>{
    e.preventDefault(); 
     
    
      localStorage.removeItem('token');
      navigate('/login')
     
 
  }
let location = useLocation();

  return (
    <>
    <nav id="navid" className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link style={{display: (localStorage.getItem('token')===null)&& "none" }} className={`nav-link ${(location.pathname==="/")? "active":" " }`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link style={{display: (localStorage.getItem('token')===null)&& "none" }} className={`nav-link ${(location.pathname==="/About")? "active":" " }`} to="/About">About</Link>
        </li>

      </ul>
      <form role="search">
    {(localStorage.getItem('token')===null)? 
    <>
    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link> 
    </>:
    <>

    <button  type="button" className="btn"><i className="fa-solid fa-user" style={{color:"#63E6BE"}}></i></button> 
    
    <button className="btn" onClick={handelLogout}><i className="fa-solid fa-right-from-bracket" style={{color:"#63E6BE"}}></i></button> 
    {/* <span><i className="fa-solid fa-user" style={{color:"#63E6BE"}}></i></span>
    <span><i className="fa-solid fa-right-from-bracket" style={{color:"#63E6BE"}}></i></span>

    */}


    </>
}  
      {/* <Link className="btn btn-primary mx-1" to="/signup" role="button">User</Link> */}
      </form>
    </div>
  </div>
</nav>
    
    </>
  )
}

export default Navbar
