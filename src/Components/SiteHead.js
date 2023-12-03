import React, { useContext, useEffect, useState } from "react";
import {Link } from "react-router-dom";
import styles from '../index.css'
import { AuthContext } from "../Util/AuthContext";
import { useNavigate } from "react-router-dom";

function SiteHead(){
    const {isAuth, setAuthStatus} = useContext(AuthContext)
    const navigate = useNavigate()
    return(<div id="headerField" style={styles.headerField}>
    <Link to="/" id="UniverName">Университетский Государственный Университет</Link>
    {!isAuth?<><Link to="/loginPage" className="headerButton" id="authPage" style={styles.headerButton}>Авторизация</Link>
    <Link to="/reg" className="headerButton" id="regPage">Регистрация</Link></>:<>
    <Link to="/lk" className="headerButton" id="accountPage">Личный кабинет</Link>
    <div className="headerButton" onClick={()=>{localStorage.session_id = 0
    setAuthStatus(false)
    navigate("/")}}>Выход</div>
    </>
    }
        <Link to="/newsPage" className="headerButton" id="mainPage">Новости</Link>
        
   </div>)
}

export default SiteHead