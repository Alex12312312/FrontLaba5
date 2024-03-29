import React, { useEffect, useState } from "react";
import styles from './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Authpage from "./Components/AuthPage";
import Link from "react-router-dom"
import SiteBody from "./Components/MainBody"
import SiteHead from "./Components/SiteHead"
import RegPage from "./Components/RegPage"
import Profile from "./Components/Profile"
import { AuthContext, SessionID } from "./Util/AuthContext";

function App(){
const [isAuth, setAuthStatus] = useState(false)
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
    <Route path="/newsPage" element={<Profile/>}/>
    <Route path="*" element={<Navigate to={{pathname:"/"}}/>}/>
    </Routes>
      </BrowserRouter>
      </AuthContext.Provider>
      </SessionID.Provider>)
        }

export default App;