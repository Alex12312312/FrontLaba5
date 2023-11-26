import React, { useContext, useEffect, useState } from "react";
import {Link } from "react-router-dom";
import styles from '../index.css'
import { AuthContext } from "../Util/AuthContext";

function SiteHead(){
    const {isAuth} = useContext(AuthContext)
    return(<div id="headerField" style={styles.headerField}>
    <div id="UniverName">Панамский Государственный Университет</div>
    {!isAuth?<><Link to="/login" className="headerButton" id="authPage" style={styles.headerButton}>Авторизация</Link>
    <Link to="/reg" className="headerButton" id="regPage">Регистрация</Link></>:
    <Link to="/lk" className="headerButton" id="accountPage">Личный кабинет</Link>}
        <Link to="/" className="headerButton" id="mainPage">Главная</Link>
        
   </div>)
}

export default SiteHead