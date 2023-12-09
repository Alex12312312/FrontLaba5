import React, { useEffect, useState } from "react";
import styles from './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Authpage from "./Components/AuthPage";
import Link from "react-router-dom"
import SiteBody from "./Components/MainBody"
import SiteHead from "./Components/SiteHead"
import RegPage from "./Components/RegPage"
import Profile from "./Components/Profile"
import CoursesPage from "./Components/CoursesPage"
import { AuthContext, SessionID } from "./Util/AuthContext";
import Podval from "./Components/Podval"

function App(){
const [isAuth, setAuthStatus] = useState((localStorage.session_id != -1)?true:false)
const [SessionId, setSessionId] = useState(null)
  return(
  <SessionID.Provider value={{
    SessionId,
    setSessionId
  }}>
  <AuthContext.Provider value={{
      isAuth,
      setAuthStatus
  }}>
  <BrowserRouter>
    <SiteHead/>
    <Routes>
    <Route exact path="/" element={<SiteBody/>}/>
    <Route path="/loginPage" element={<Authpage/>}/>
    <Route path="/reg" element={<RegPage/>}/>
    <Route path="/lk" element={<Profile/>}/>
    <Route path="/coursesPage" element={<CoursesPage/>}/>
    <Route path="*" element={<Navigate to={{pathname:"/"}}/>}/>
    </Routes>
    <Podval/>
      </BrowserRouter>
      </AuthContext.Provider>
      </SessionID.Provider>)
        }

export default App;