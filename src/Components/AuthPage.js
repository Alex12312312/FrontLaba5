import React, { useContext, useState } from "react";
import styles from '../index.css'
import checkEnter from '../scripts/checkEnter'
import { AuthContext } from "../Util/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
function Authpage(){
    const {AuthStatus, setAuthStatus} = useContext(AuthContext)
    const [loginValue, setLogin] = useState('')
    const [passwordValue, setPassword] = useState('')
    const [errMsg, setError] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/user/login', {loginValue, passwordValue})
        .then((response) =>{
          response.event.preventDefault()
          setAuthStatus(true);
          <Navigate to={{pathname:"/"}}/>
      });
        console.log(response.data);
      } catch (error) {
        setError(error);
      }
    };

    return(
        <div id="AuthPage" style={styles.Authpage}>
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
    )
  }

export default Authpage;