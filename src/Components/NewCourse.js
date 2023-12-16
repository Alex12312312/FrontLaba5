import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
function NewCourse(){
    const navigate = useNavigate()
    const [IMGfile, setFile] = useState(null)
    const [titleValue, setTitle] = useState(null)
    const [textValue, setText] = useState(null)
    const [newsError, setError] = useState("")
    const addNewFile = (event) =>{
        const curfile = event;
    const reader = new FileReader();
    reader.readAsDataURL(curfile);
    reader.onload = () => {
        const base64 = reader.result;
        setFile(base64);;
      };
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
            console.log(error)
        })
    }
    return(<div className="newItemPage">
        <div className="ItemField">
            <input className="TitleInput" placeholder="Введите заголовок курса" onChange={e=>setTitle(e.target.value)}></input>
        </div>
        <div className="ItemField">
            <textarea className="TextInput" placeholder="Введите описание курса" onChange={e=>setText(e.target.value)}></textarea>
        </div>
        <div className="ItemField">
            <div className="ImageUploadFieldTitle">Прикрепите изображение к новому курсу</div>
            <input accept="image/png, image/jpeg, image/gif, image/jpg" type="file" className="ImageUploadButton"
            onChange={(e)=>{addNewFile(e.target.files[0])}}></input>
        </div>
        <div className="ItemField">
            <button onClick={(e)=>{addCourse(e)}}>Опубликовать</button>
            <div className="errorField">{newsError}</div>
        </div>
    </div>)
}

export default NewCourse