import React, { useContext, useState } from "react";
import styles from '../index.css'
import { AuthContext, SessionID } from "../Util/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
function Authpage(){
    const {AuthStatus, setAuthStatus} = useContext(AuthContext)
    const {SessionId, setSessionId} = useContext(SessionID)
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
            localStorage.session_id = response.data
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
        </div>:navigate("/")
    )
  }

export default Authpage;