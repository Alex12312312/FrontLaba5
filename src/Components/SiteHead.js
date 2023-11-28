import React, { useContext, useEffect, useState } from "react";
import {Link } from "react-router-dom";
import styles from '../index.css'
import { AuthContext } from "../Util/AuthContext";

function SiteHead(){
    const {isAuth} = useContext(AuthContext)
    return(<div id="headerField" style={styles.headerField}>
    <Link to="/" id="UniverName">Университетский Государственный Университет</Link>
    {!isAuth?<><Link to="/loginPage" className="headerButton" id="authPage" style={styles.headerButton}>Авторизация</Link>
    <Link to="/reg" className="headerButton" id="regPage">Регистрация</Link></>:
    <Link to="/lk" className="headerButton" id="accountPage">Личный кабинет</Link>
    }
        <Link to="/newsPage" className="headerButton" id="mainPage">Новости</Link>
        
   </div>)
}

export default SiteHead