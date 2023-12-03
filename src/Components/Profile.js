import axios from 'axios'
import styles from '../index.css'
import React, { useContext, useState } from "react";
import { SessionID } from '../Util/AuthContext';
import CourseItem from './ProfileCourseItem'
function Profile(){
    const [imageItem, setImage] = useState("")
    const [loginValue, setLogin] = useState("")
    const [emailValue, setEmail] = useState("")
    const [visitCount, setVisitCount] = useState(0)
    const [userStatus, setUserStatus] = useState("")
    const [lastValue, setLastValue] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const req = async(e) =>{
        axios
        .get("http://localhost:8080/user/info", {headers: {
            Authorization: localStorage.session_id,
        }})
        .then((response) =>{
        const dataURI = `data:image/png;base64,${response.data.avatar}`;
        setImage(dataURI)
        setEmail(response.data.email)
        setLogin(response.data.login)
        setUserStatus(response.data.role)
        setVisitCount(response.data.enterCounter)
        localStorage.setItem("user_id", response.data.id)
        })
    }
    req(localStorage.session_id)
    const courses = async()=>{
        axios
        .get("http://localhost:8080/course/user", {headers:{
            Authorization: localStorage.session_id
        }, params:{
            user_id: localStorage.user_id
        }})
        .then((response)=>{
            
        })
    }
    courses()
    const handleImageUpload = (event) =>{
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = reader.result;
      setSelectedImage(base64);
    };

    reader.readAsDataURL(file);
    const uploadImage = () => {
        axios
        .post("http://localhost:8080/user/avatar", {headers:{
            Authorization: localStorage.session_id,
        }, data:{
            file: selectedImage
        }})
        .then((response) =>{
            console.log(response)
        })
  };
  uploadImage()
    }

    return(
    <div id="ProfilePage" style={styles.ProfilePage}>
    <div id="lkPage">Добро пожаловать, {loginValue}</div>
    <div id="UserCart">
    <div id="ImagePlace">
    <img className='ProfileImage' src={imageItem}></img>
    <input type="file" id="ChangeImageArea" onChange={handleImageUpload}/>
    </div>
    <div id="DataPlace">
        <div>Количество посещений: {visitCount}</div>
        <div>email: {emailValue}</div>
        <div>Статус: {userStatus}</div>
        <div id="CoursesPlace">
            <p>Ваши курсы</p>
        </div>
    </div>
    </div>
    </div>)
}

export default Profile