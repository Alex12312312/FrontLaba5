import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Util/AuthContext";

function RegPage(){
    const {isAuth, setAuthStatus} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [errMsg, setError] = useState('');
    const getEmail = (e) =>{
        setEmail(e.target.value)
    }
    const getPass = (e) =>{
        setPassword(e.target.value)
    }
    const getLogin = (e) =>{
        setLogin(e.target.value)
    }
    const req = ()=>{
        axios
        .get("/registration")
        .then((response) =>{
            response.event.preventDefault()
            setAuthStatus(true);
            <Navigate to={{pathname:"/"}}/>
        })
        .catch((error) =>{
            setError(error)
        })
    }
    return(
    <form className="RegBlock">
        <input className="RegField" id={"LoginField"} placeholder={"Login"} onChange={getLogin}/>
        <input className="RegField" id={"PasswordField"} placeholder={"Password"} onChange={getPass}/>
        <input className="RegField" id={"InputField"} placeholder={"Email"} onChange={getEmail}/>
        <p>{errMsg.message}</p>
        <button className="RegField" onClick={req}>Зарегистрироваться</button>
        {isAuth?<Navigate to={{pathname:"/"}}/>:null}
    </form>)
}

export default RegPage;