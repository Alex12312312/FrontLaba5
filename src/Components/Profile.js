import axios from 'axios'
import styles from '../index.css'
import React, { useContext, useState, useEffect } from "react";
import { SessionID } from '../Util/AuthContext';
import CourseItem from './ProfileCourseItem'
function Profile(){
    const [imageItem, setImage] = useState("")
    const [loginValue, setLogin] = useState("")
    const [emailValue, setEmail] = useState("")
    const [visitCount, setVisitCount] = useState(0)
    const [texts, setTexts] = useState([]);
    const [userStatus, setUserStatus] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const req = async() =>{
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
    req()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/course/user', {headers:{
                Authorization: localStorage.session_id
            }, params:{
                user_id: localStorage.user_id
            }});
            const data = response.data.map(elem=>{return [elem.name,`data:image/png;base64,${elem.image}`, elem.description]});
            setTexts(data);
          } catch (error) {
          }
        };
        fetchData();
      }, []);
    const handleImageUpload = (event) =>{
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const uploadImage = (element) => {axios.post("http://localhost:8080/user/avatar", {headers:{
            Authorization: localStorage.session_id,
        }, data:{
            file: element
        }})
        .then((response) =>{
            console.log(response.status)
        }
        )
    }
    reader.onload = () => {
        const base64 = reader.result;
        setSelectedImage(base64)
        uploadImage(base64);;
      };
  };
    return(
    <div id="ProfilePage" style={styles.ProfilePage}>
    <div id="lkPage">Добро пожаловать, {loginValue}</div>
    <div id="UserCart">
    <div id="ImagePlace">
    <img className='ProfileImage' src={imageItem}></img>
    <input type="file" id="ChangeImageArea" onChange={(e) => {handleImageUpload(e)}}/>
    </div>
    <div id="DataPlace">
        <div>Количество посещений: {visitCount}</div>
        <div>email: {emailValue}</div>
        <div>Статус: {userStatus}</div>
        <div id="CoursesPlace">
            <p>Ваши курсы</p>
            {texts.map((text, index) => (
    <div className="CourseItem" key={index} title={text[2]}>{text[0]}<img className="CourseItemIMG" key={index} src={text[1]}></img>
    <button>Отписаться</button></div>
    ))}
        </div>
    </div>
    </div>
    </div>)
}

export default Profile