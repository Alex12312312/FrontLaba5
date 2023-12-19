import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
function NewCourse(){
    const location = useLocation()
    const navigate = useNavigate()
    const [IMGfile, setFile] = useState((location.state != null)? location.state.imgs:null)
    const [titleValue, setTitle] = useState((location.state != null)? location.state.title:"")
    const [textValue, setText] = useState((location.state != null)? location.state.newsText:"")
    const [idValue, setId] = useState((location.state != null)? location.state.courseId:"")
    const [newsError, setError] = useState("")
    const addNewFile = (event) =>{
        const curfile = event;
    const reader = new FileReader();
    reader.onload = () => {
        const base64 = reader.result;
        setFile(base64);;
      };
    reader.readAsDataURL(curfile);
    }
    const addCourse = (event) =>{
        event.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/course/add',
            headers: {Authorization: localStorage.session_id},
            data: {name: titleValue,
            description: textValue,
            image: IMGfile}
        }).then((response)=>{
            navigate("/controlPanel")
        }).catch((error)=>{
            setError(error.response.data)
        })
    }
    const editCourse = (event) =>{
        event.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/course/edit',
            headers: {Authorization: localStorage.session_id},
            params: {id: idValue},
            data: {name: titleValue,
            description: textValue,
            image: IMGfile}
        }).then(()=>{
            navigate("/coursesPage")
        })
    }
    return(<div className="newItemPage">
        <div className="ItemField">
            <input className="TitleInput" placeholder="Введите заголовок курса" onChange={e=>setTitle(e.target.value)}
            value={titleValue}></input>
        </div>
        <div className="ItemField">
            <textarea className="TextInput" placeholder="Введите описание курса" onChange={e=>setText(e.target.value)}
            value={textValue}></textarea>
        </div>
        <div className="ItemField">
            <div className="ImageUploadFieldTitle">Прикрепите изображение к новому курсу</div>
            <input accept="image/png, image/jpeg, image/gif, image/jpg" type="file" className="ImageUploadButton"
            onChange={(e)=>{addNewFile(e.target.files[0])}}></input>
        </div>
        <div className="ItemField" id="NewsImagesLine">
            {IMGfile != null?<img className="NewNewsImageItem" src={IMGfile} onClick={() => setFile(null)}></img>:null}
        </div>
        <div className="ItemField">
            <button onClick={(e)=>{location.state == null?addCourse(e):editCourse(e)}}>Опубликовать</button>
            <div className="errorField">{newsError}</div>
        </div>
    </div>)
}

export default NewCourse