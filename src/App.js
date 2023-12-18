import React, { useEffect, useState } from "react";
import styles from './index.css'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Authpage from "./Components/AuthPage";
import Link from "react-router-dom"
import SiteBody from "./Components/MainBody"
import SiteHead from "./Components/SiteHead"
import RegPage from "./Components/RegPage"
import Profile from "./Components/Profile"
import CoursesPage from "./Components/CoursesPage"
import { AuthContext, SessionID } from "./Util/AuthContext";
import Podval from "./Components/Podval"
import NewsPage from "./Components/NewsPage"
import ControlPanel from "./Components/ControlPanel";
import NewCourse from "./Components/NewCourse";
import NewNews from "./Components/NewNews";
import UserList from "./Components/UserList";
import UserEdit from "./Components/UserEdit";

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
    <Route path="/addNews" element={<NewNews/>}/>
    <Route path="/addCourse" element={<NewCourse/>}/>
    <Route exact path="/newsPage/:id" element={<NewsPage/>}/>
    <Route path="/loginPage" element={<Authpage/>}/>
    <Route path="/reg" element={<RegPage/>}/>
    <Route path="/lk" element={<Profile/>}/>
    <Route path="/coursesPage" element={<CoursesPage/>}/>
    <Route path="/controlPanel" element={<ControlPanel/>}/>
    <Route path="/userEdit" element={<UserEdit/>}/>
    <Route path="/userList" element={<UserList/>}/>
    <Route path="*" element={<Navigate to={{pathname:"/"}}/>}/>
    </Routes>
    <Podval/>
      </BrowserRouter>
      </AuthContext.Provider>
      </SessionID.Provider>)
        }

export default App;