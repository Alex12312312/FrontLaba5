import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Util/AuthContext";

function RegPage(){
    const {isAuth, setAuthStatus} = useContext(AuthContext)
    const [emailValue, setEmail] = useState('');
    const [passwordValue, setPassword] = useState('');
    const [loginValue, setLogin] = useState('');
    const [errMsg, setError] = useState('');
    const navigate = useNavigate();
    var newUserData = {
        login: loginValue,
        password: passwordValue,
        email: emailValue,
        role: "1"
    }
    const getEmail = (e) =>{
        setEmail(e.target.value)
    }
    const getPass = (e) =>{
        setPassword(e.target.value)
    }
    const getLogin = (e) =>{
        setLogin(e.target.value)
    }
    const req = (e)=>{
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/registration',
            data: newUserData
        })
        .then((response) =>{
            setAuthStatus(true);
            navigate("/")
        })
        .catch((error) =>{
            setError(error)
        })
    }
    return(
    <form className="RegBlock">
        <input className="RegField" id={"LoginField"} placeholder={"Login"} onChange={val => getLogin(val)}/>
        <input className="RegField" id={"PasswordField"} placeholder={"Password"} onChange={val => getPass(val)}/>
        <input className="RegField" id={"InputField"} placeholder={"Email"} onChange={val => getEmail(val)}/>
        <p>{errMsg.message}</p>
        <button className="RegFieldButton" onClick={(e) => req(e)}>Зарегистрироваться</button>
        {isAuth?<Navigate to={{pathname:"/"}}/>:null}
    </form>)
}

export default RegPage;