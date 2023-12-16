import axios from 'axios'
import styles from '../index.css'
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext, SessionID } from '../Util/AuthContext';
import CourseItem from './ProfileCourseItem'
function Profile(){
    const {isAuth, setAuthStatus} = useContext(AuthContext)
    const [imageItem, setImage] = useState("")
    const [loginValue, setLogin] = useState("")
    const [emailValue, setEmail] = useState("")
    const [idValue, setID] = useState(-1)
    const [visitCount, setVisitCount] = useState(0)
    const [texts, setTexts] = useState([]);
    const navigate = useNavigate()
    const [userStatus, setUserStatus] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const fetchData = () => {
        axios.get('http://localhost:8080/course/user', {headers:{
            Authorization: localStorage.session_id
        }, params:{
            user_id: localStorage.user_id
        }})
        .then((response) => {
        const data = response.data.map(elem=>{return [elem.name,`data:image/${elem.image[0]};base64,${elem.image[1]}`, elem.description, elem.id]});
        setTexts(data);})
    };
    const req = async() =>{
        axios
        .get("http://localhost:8080/user/info", {headers: {
            Authorization: localStorage.session_id
        }})
        .then((response) => {
        if(response.status == 200){
        localStorage.setItem("user_id", response.data.id)
        setID(response.data.id)
        const dataURI = `data:image/${response.data.avatar[0]};base64,${response.data.avatar[1]}`;
        setImage(dataURI)
        setEmail(response.data.email)
        setLogin(response.data.login)
        setUserStatus(response.data.role)
        setVisitCount(response.data.enterCounter)
        fetchData();
        } else{
        setID(-1)
        setImage("")
        setEmail("")
        setLogin("")
        setUserStatus("")
        setVisitCount(-1)
        navigate("/")
        }
        })
        .catch((error) => {
        if(error.response.status == 401){
        setID(-1)
        setImage("")
        setEmail("")
        setLogin("")
        setUserStatus("")
        setVisitCount(-1)
        setAuthStatus(false)
        localStorage.user_id = -1
        localStorage.session_id = -1
        navigate("/authPage")
        }
        })
    }
    useEffect(() => {
        req()
      }, [localStorage.session_id, imageItem]);
    const handleImageUpload = (event) =>{
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const uploadImage = (element) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/avatar',
            headers: {Authorization: localStorage.session_id},
            data: {file: element}
        })
        .then((response) =>{
            req()
        }
        )
    }
    reader.onload = () => {
        const base64 = reader.result;
        setSelectedImage(base64)
        uploadImage(base64);;
      };
  };
  const delCourse = (courseID) => {
    axios({
        method: 'get',
        url: 'http://localhost:8080/course/user/delete',
        headers: {Authorization: localStorage.session_id},
        params: {course_id: courseID,
        user_id: localStorage.user_id}
    }).then(()=>{
        fetchData()
    })
  } 
    return(
    <div className='sitePage' id="ProfilePage" style={styles.ProfilePage}>
    <div id="lkPage">Добро пожаловать, {loginValue}</div>
    <div id="UserCart">
    <div id="ImagePlace">
    <img className='ProfileImage' src={imageItem}></img>
    <input accept="image/png, image/jpeg, image/gif, image/jpg" type="file" id="ChangeImageArea" onChange={(e) => {handleImageUpload(e)}}/>
    </div>
    <div id="DataPlace">
        <div>Количество посещений: {visitCount}</div>
        <div>email: {emailValue}</div>
        <div>Статус: {userStatus}</div>
        {userStatus != "user"? <Link to="/controlPanel" id="ConsolePanelLink">Панель управления</Link>:null}
        <div id="CoursesPlace">
            <p>Ваши курсы</p>
            {texts.map((text, index) => (
    <div className="CourseItem" key={index} title={text[2]}>{text[0]}<img className="CourseItemIMG" key={index} src={text[1]}></img>
    <button onClick={()=>{delCourse(text[3])}}>Отписаться</button></div>
    ))}
        </div>
    </div>
    </div>
    </div>)
}

export default Profile