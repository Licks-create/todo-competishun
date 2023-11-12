/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import "./Signup.css"
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onSignUp({ username, password });
    };

    const onSignUp=({ username, password })=>{
      if(username==="")return toast.error("Enter Valid username")
      if(password==="")return toast.error("Enter Valid Password")
      const data=JSON.parse(localStorage.getItem("user"))
      if(data){
        const usernameMatched=data.find(x=>x.username===username)
        if(usernameMatched){
          toast.error("username already present")
          navigate("/login")
          return
       }
       data.push({username,password})
       localStorage.setItem("user",JSON.stringify(data)) 
      }
      else{
        localStorage.setItem("user",JSON.stringify([{username,password}])) 
      }
      toast.success("registered")
      navigate("/login")
    }

return (
    <div className='signup'>
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Sign Up
      
      </button>
        <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-evenly",width:"60%",margin:".4rem auto"}}>
        <span>Already Have? </span>
      <button type="button" onClick={()=>{navigate("/login")}} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <span>
        Login
        </span>
      <LoginIcon style={{fontSize:"15px",marginLeft:"1rem"}}/>
      
      </button>
        </div>
    </form>

    </div>
  )
}

export default Signup
