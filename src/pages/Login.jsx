/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Login.css";
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setSuccess(!success)
    const data = JSON.parse(localStorage.getItem("user"));
    const activePerson = data?.find((x) => x.isactive);
    setSuccess(activePerson?.isactive || false);
    if (activePerson?.isactive) navigate("/login/todo");
  },[]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  const onLogin = ({ username, password }) => {
      if(username==="")return alert("Enter Valid username")
      if(password==="")return alert("Enter Valid Password")
    let data = JSON.parse(localStorage.getItem("user"));

    if (!data) {
      alert("User Not Found!");
      navigate("/");
      return;
    }

    const usernameMatched = data.find((x) => x.username === username);
    if (!usernameMatched) {
      alert("usernmae does not exist!");
      return;
    }
    const userpassMatched = data.find(
      (x) => x.username === username && x.password === password
    );
    if (!userpassMatched) {
      alert("wrong password!");
      return;
    }
    alert("Logged in")
    const updatedData = data.map((obj) => {
      if (obj.username === username) return { ...obj, isactive: true };
      return obj;
    });

    data = updatedData;
    localStorage.setItem("user", JSON.stringify(data));
    setSuccess(true);
    navigate("/login/todo");
  };

  
  return !success ? (
    <div className="login">
      
      <h1 style={{color:"rgb(228, 243, 12)",textShadow:"1px 1px 2px currentColor"}}>SING IN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Log In</button>
        <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-evenly",width:"80%",margin:".4rem auto"}}>
        <span> Don&#39;t Have Account? </span>
      <button type="button" onClick={()=>{navigate("/")}}>Sign up</button>
        </div>
      </form>
    </div>
  ) : (
    <Outlet  style={{width:'100vw'}}/>
  );
};

export default Login;
