/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {useNavigate,Outlet, Link} from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import "./Home.css"
import toast from 'react-hot-toast';
const Home = () => {
  const navigate=useNavigate()
  let data=JSON.parse(localStorage.getItem("user"))
  const activePerson=data?.find(x=>x.isactive)


  const logout=()=>{
    
    let data=JSON.parse(localStorage.getItem("user"))
    data=data.map(obj=>({...obj,isactive:false}))
    localStorage.setItem("user",JSON.stringify(data))
    navigate("/login")
    window.location.reload(true)
    toast.success("Logged out")
  }
  return (
    <main className='home'>
      <header className='header'>
        <div style={{height:"3vh"}}>
         {activePerson && (<h3 style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>hello, {activePerson.username} <PersonIcon style={{marginLeft:".5rem"}}/></h3>) || (<h3>TODO APP</h3>)}
        </div>
        <div className='logout'>
          {activePerson && <Link to={"/login"}style={{color:"white",textDecoration:"none",display:"flex",alignItems:"center",paddingBlock:"0.5rem"}}  onClick={()=>{
              logout()
          }}>
            <span >Logout</span>
          
          <LogoutIcon style={{marginLeft:".5rem",fontSize:"15px"}}/>
          </Link> 
        ||
         <Link to={"/"}style={{color:"white",textDecoration:"none"}}>Signup</Link>
         
         }
        </div>
      </header>
    <div className='outlet' >
    <Outlet/>
    </div>
    </main>
  )
}

export default Home
