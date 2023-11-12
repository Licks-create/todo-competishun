/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {useNavigate,Outlet, Link} from "react-router-dom"
import "./Home.css"
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
    alert("Logged out")
  }
  return (
    <main className='home'>
      <header className='header'>
        <div style={{maxHeight:"6vh"}}>
         {activePerson && (<h3>hello, {activePerson.username}</h3>) || (<h3>TODO APP</h3>)}
        </div>
        <div className='logout'>
          {activePerson && <Link to={"/login"}style={{color:"white",textDecoration:"none"}}  onClick={()=>{
              logout()
          }}>Logout</Link> 
        ||
         <Link to={"/"}style={{color:"white",textDecoration:"none"}}>Signup</Link>
         
         }
        </div>
      </header>
    <div >
    <Outlet/>
    </div>
    </main>
  )
}

export default Home
