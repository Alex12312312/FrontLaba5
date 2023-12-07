import axios from 'axios'
import styles from '../index.css'
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Util/AuthContext";
function CoursesPage(){
    const {isAuth, setAuthStatus} = useContext(AuthContext)
    const [items, setItems] = useState([])
    const [userCourses, setUserCourses] = useState([])
    const getUserCourses = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/course/user',
            headers: {'Authorization': Number(localStorage.session_id)},
            params: {user_id: localStorage.user_id}
        })
    };
    useEffect(() => {
        const fetchData = () => {
            getUserCourses();
            axios.get('http://localhost:8080/course/all')
            .then((response) => {
            const data = response.data.map(elem=>{return [elem.name,`data:image/png;base64,${elem.image}`, elem.description, elem.id]});
            setItems(data);})
        };
    fetchData()
    }, [])
    const addCourse = (courseIndex) => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/course/user/add',
            headers: {'Authorization': Number(localStorage.session_id)},
            params: {course_id: courseIndex,
            user_id: localStorage.user_id}
        })
        .then((response) => {
            
        })
    }
    return(<div className='CoursesPage'>
         {items.map((text, index) => (
    <div key={"item"+index} className="CoursePageItem"  title={text[2]}><div key={'text' + index}>{text[0]}</div>
    <img className="CourseItemIMG" key={"image" + index} src={text[1]}></img>
    {(isAuth && !(text in userCourses))?<button onClick={(e) => {addCourse(text[3])}}>Записаться</button>:<></>}</div>
    ))}
    </div>)
}

export default CoursesPage