import axios from 'axios'
import styles from '../index.css'
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Util/AuthContext";
import { useNavigate, Link } from "react-router-dom";
function CoursesPage(){
    const navigate = useNavigate()
    const {isAuth, setAuthStatus} = useContext(AuthContext)
    const [items, setItems] = useState([])
    const [userCourses, setUserCourses] = useState([])

    const getUserCourses = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/course/user',
            headers: {Authorization: Number(localStorage.session_id)},
            params: {user_id: Number(localStorage.user_id)}
        }).then((response) => {
            const data = response.data.map(elem=>{return [elem.name,`data:image/${elem.image[0]};base64,${elem.image[1]}`, elem.description, elem.id]});
            setUserCourses(data);}
        ).catch((error) =>{
            setAuthStatus(false)
        })
    };
    
    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:8080/course/all')
            .then((response) => {
            const data = response.data.map(elem=>{return [elem.name,`data:image/${elem.image[0]};base64,${elem.image[1]}`, elem.description, elem.id]});
            setItems(data);})
        }
    if(isAuth){
    getUserCourses()
    }
    fetchData()
    }, [])
    const addCourse = (courseIndex, e) => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/course/user/add',
            headers: {'Authorization': Number(localStorage.session_id)},
            params: {course_id: courseIndex[3],
            user_id: localStorage.user_id}
        })
        .then((response) => {
            courseIndex[4] = true
            setUserCourses(userCourses => [...userCourses, courseIndex])
        })
        .catch((error) => {
            if(error.response.status == 401){
                localStorage.user_id = -1
                localStorage.session_id = -1
                setAuthStatus(false)
                navigate("/")
            } 
            else if(error.response.status == 400){
                setUserCourses(userCourses => [...userCourses, courseIndex])
            }
        })
    }
    const delCourse = (event, CourseData) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/course/delete',
            headers: {'Authorization': Number(localStorage.session_id)},
            params: {id: CourseData[3]}
        }).catch((error) => {
            if(error.response.status == 401){
                localStorage.user_id = -1
                localStorage.session_id = -1
                setAuthStatus(false)
                navigate("/")
            } 
        }).then(() => {
            axios.get('http://localhost:8080/course/all')
            .then((response) => {
            const data = response.data.map(elem=>{return [elem.name,`data:image/${elem.image[0]};base64,${elem.image[1]}`, elem.description, elem.id]});
            setItems(data);})
        })
    }

    return(<div className='sitePage' id='CoursesPage'>
         {items.map((text, index) => (
    <div key={"item"+index} className="CoursePageItem"  title={text[2]}><div key={'text' + index}>{text[0]}</div>
    <img className="CourseItemIMG" key={"image" + index} src={text[1]}></img>
    {(isAuth && !userCourses.includes(text))?<button onClick={(e) => {addCourse(text, e)}}>
        Записаться</button>:<></>}
    {(localStorage.user_role != "user")?<><button onClick={(e) => {delCourse(e, text)}}>Удалить курс</button>
    <Link className='CourseEditButton' to="/addCourse" state={{title: text[0], newsText: text[2], imgs: text[1], courseId: text[3]}}>Редактировать курс</Link>
    </>:<></>}</div>
    ))}
    </div>)
}

export default CoursesPage