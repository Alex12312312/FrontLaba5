import React, { useContext, useState } from "react";
import styles from '../index.css'
import { AuthContext } from "../Util/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
function Authpage(){
    const {AuthStatus, setAuthStatus} = useContext(AuthContext)
    const [loginValue, setLogin] = useState('')
    const [passwordValue, setPassword] = useState('')
    const [errMsg, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      axios
        .get("http://localhost:8080/user/login", {params: {
          login:loginValue,
          password:passwordValue}})
        .then((response) =>{
            setAuthStatus(true);
            navigate("/")
        })
        .catch((error) =>{
            setError(error)
        })
    };

    return(
      (!AuthStatus)?
        <div id="AuthPage" style={styles.Authpage}>
        <div id="AuthBlock">
        <div id="dataFields">
        <div className="authField" id="loginField" style={styles.headerButton}>
          <input placeholder="Login" onChange={val => setLogin(val.target.value)}/></div>
        <div className="authField" id="passwordField">
          <input placeholder="Password" onChange={val => setPassword(val.target.value)}/></div>
        </div>
        <button id="EnterButton" onClick={(e)=>
          handleLogin(e)
        }>Войти</button>
        <div id="ErrorField">{errMsg.message}</div>
        </div>
        </div>:<Navigate to={{pathname:"/"}}/>
    )
  }

export default Authpage;