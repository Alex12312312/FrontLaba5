import React, { useContext, useEffect, useState } from "react";
import {Link } from "react-router-dom";
import styles from '../index.css'
import { AuthContext } from "../Util/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SiteHead(){
    const {isAuth, setAuthStatus} = useContext(AuthContext)
    const navigate = useNavigate()
    const CloseSession = () =>{
        /*axios.get('http://localhost:8080/user/logout', {headers:{
            Authorization: localStorage.session_id
        }})*/axios({
            method: 'get',
            url: 'http://localhost:8080/user/logout',
            headers: {'Authorization': Number(localStorage.session_id)}
        }).then((response) => {
            localStorage.session_id = -1
            localStorage.user_id = -1
            localStorage.user_role = "user"
            setAuthStatus(false)
            navigate("/")
        }
        ).catch((error)=>{
            localStorage.session_id = -1
            localStorage.user_id = -1
            localStorage.user_role = "user"
            setAuthStatus(false)
            navigate("/")
        })
    }
    return(<div id="headerField" style={styles.headerField}>
    <Link to="/" id="UniverName">Университетский Государственный Университет</Link>
    {!isAuth?<><Link to="/loginPage" className="headerButton" id="authPage" style={styles.headerButton}>Авторизация</Link>
    <Link to="/reg" className="headerButton" id="regPage">Регистрация</Link></>:<>
    <Link to="/lk" className="headerButton" id="accountPage">Личный кабинет</Link>
    <div className="headerButton" onClick={()=>{CloseSession()}}>Выход</div>
    </>
    }
        <Link to="/coursesPage" className="headerButton" id="coursesPage">Курсы</Link>
        
   </div>)
}

export default SiteHead