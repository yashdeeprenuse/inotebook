import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import ContextForNote from '../Context/notes/NoteContext';

const Login = () => {

    let navigate = useNavigate();
   
    const[Credential,setCredentials ] = useState({email:"", password:""})
    const  onchange = (e)=>{
         setCredentials({...Credential, [e.target.name]: e.target.value})
    }

    const onsubmit = async (e)=>{
          e.preventDefault(); 
        let loginAuth =await fetch("http://localhost:5000/api/auth/login", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:Credential.email, password:Credential.password})
        })

        let authtoken = await loginAuth.json();

        if(authtoken.success){
            localStorage.setItem("token", authtoken.authtoken)
           navigate("/");
        }
        else{
          alert(authtoken.error);
        }
        // console.log(localStorage.getItem("token"));
    }
    
  return (
    <>
    <form className='container mt-5 'style={{width:"50vw"}} onSubmit={onsubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" required className="form-control" name='email' id="email" onChange={onchange} aria-describedby="emailHelp" value={Credential.email}/>

  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label" >Password</label>
    <input type="password" required className="form-control" id="password" name='password' onChange={onchange} value={Credential.password}/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
 
    </>
  )
}

export default Login
