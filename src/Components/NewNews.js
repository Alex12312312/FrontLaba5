import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
function NewNews(){
    const navigate = useNavigate()
    const [IMGfile, setFile] = useState([])
    const [titleValue, setTitle] = useState(null)
    const [textValue, setText] = useState(null)
    const [newsError, setError] = useState("")
    const addNewFile = (event) =>{
        const curfile = event;
    const reader = new FileReader();
    reader.readAsDataURL(curfile);
    reader.onload = () => {
        const base64 = reader.result;
        setFile(currentFiles => [...currentFiles,base64]);;
        console.log(IMGfile)
      };
    }
    const addCourse = (event) =>{
        event.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/news/add',
            headers: {Authorization: localStorage.session_id},
            data: {title: titleValue,
            user_id: localStorage.user_id,
            description: textValue,
            images: IMGfile}
        }).then((response)=>{
            navigate("/controlPanel")
        }).catch((error)=>{
            setError("Ошибка")
        })
    }
    const delIMG = (index) =>{
        const updatedImages = [...IMGfile];
    updatedImages.splice(index, 1);
    setFile(updatedImages);
    }
    return(<div className="newItemPage">
        <div className="ItemField">
            <input className="TitleInput" placeholder="Введите заголовок новости" onChange={e=>setTitle(e.target.value)}></input>
        </div>
        <div className="ItemField">
            <textarea className="TextInput" placeholder="Введите текст новости" onChange={e=>setText(e.target.value)}></textarea>
        </div>
        <div className="ItemField">
            <div className="ImageUploadFieldTitle">Прикрепите изображения к новости</div>
            <input accept="image/png, image/jpeg, image/gif, image/jpg" type="file" className="ImageUploadButton"
            onChange={(e)=>{addNewFile(e.target.files[0])}}></input>
        </div>
        <div className="ItemField" id="NewsImagesLine">
            {IMGfile.map((element, index) => (
                <div key={index} >
                <img className="NewNewsImageItem" src={element} onClick={() => delIMG(index)}></img>
                </div>
            ))}
        </div>
        <div className="ItemField">
            <button onClick={(e)=>{addCourse(e)}}>Опубликовать</button>
            <div className="errorField">{newsError}</div>
        </div>
    </div>)
}

export default NewNews