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

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/login', {loginValue, passwordValue})
        .then((response) =>{
          response.event.preventDefault()
          setAuthStatus(true);
          <Navigate to={{pathname:"/"}}/>
      });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    return(
        <div id="AuthPage" style={styles.Authpage}>
        <div id="dataFields">
        <div className="authField" id="loginField" style={styles.headerButton}>
          <input placeholder="Login" onChange={setLogin}/></div>
        <div className="authField" id="passwordField">
          <input placeholder="Password" onChange={setPassword}/></div>
        </div>
        <button id="EnterButton" onClick={()=>
          handleLogin()
        }>Войти</button>
        <div id="ErrorField"></div>
        </div>
    )
  }

export default Authpage;