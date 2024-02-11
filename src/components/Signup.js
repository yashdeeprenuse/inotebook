import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import contextforAlert from '../Context/alerts/AlertContext';

const Signup = () => {
  let alertvalue= useContext(contextforAlert);
  

  let navigate2 = useNavigate();
  const [newUser, setnewUser] = useState({name:"", email:"", password:""});
  
 let onchange = (e)=>{
       setnewUser({...newUser, [e.target.name]:e.target.value})
  }
 
  let onUserSubmit =async (e)=>{
    e.preventDefault(); 
    let signup =await fetch("http://localhost:5000/api/auth/createuser", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name:newUser.name, email:newUser.email, password:newUser.password})
    })
    let signupdata = await signup.json();
   if(signupdata.succ){
    localStorage.setItem('token', signupdata.authtoken);
    alertvalue.alertfunc("User Created Successfully!", "success")
    navigate2("/");
   }
   else if(signupdata.succ === false){
      alertvalue.alertfunc(signupdata.error, "danger")
   }

setnewUser({name:"", email:"", password:""})
  }

  



  return (

   <>
   
   <form className='container mt-5 'style={{width:"50vw"}} onSubmit={onUserSubmit} >
   <div className="mb-3">
    <label htmlFor="name" className="form-label">Username</label>
    <input type="text" className="form-control" value={newUser.name} name='name' id="name" onChange={onchange} aria-describedby="emailHelp" required />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"  value={newUser.id}  name='email' id="email" onChange={onchange} aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" minLength={5} value={newUser.password} onChange={onchange} id="password" name='password'/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" minLength={5} className="form-control" id="cpassword" name='cpassword'/>
  </div>
  <button type="submit" disabled={newUser.name==="" || newUser.email===""|| newUser.password===""} className="btn btn-primary">Submit</button>
</form>
   
   </>
  )
}

export default Signup
