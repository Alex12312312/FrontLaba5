import { useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import axios from "axios"
function NewsPage(){
    const navigate = useNavigate()
    const location = useLocation()
    const [currentNum, setCurrentNum] = useState(0)
    const setPreviosImage = () => {
        if((currentNum - 1) >= 0){
            setCurrentNum(currentNum - 1)
        }
    }
    const setNextImage = () => {
        if((currentNum + 1) < location.state.elem[3].length){
            setCurrentNum(currentNum + 1)
        }
    }
    const DelNews = (event) => {
        event.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/news/delete',
            headers: {Authorization: localStorage.session_id},
            params: {
            id:location.state.elem[4]
            }
        }).then((response)=>{
            navigate(-1)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(<div className="sitePage" id="newsPage">
        <div id="newsPageBlock">
            <div id="newsPageTitle">
                {location.state.elem[0]}
            </div>
            <div id="newsPageImagesField">
            <div className="newsPageButton" onClick={()=>{setPreviosImage()}}>{"<"}</div>
            <img id="newsPageImage" src={location.state.elem[3][currentNum]} alt="Изображение отсутствует"></img>
            <div className="newsPageButton" onClick={()=>{setNextImage()}}>{">"}</div>
            </div>
            <div id="newsPageText">
                {location.state.elem[1]}
            </div>
        </div>
        {localStorage.role != "user"?<div id="NewsControlPanel">
        <Link className="NewsControlButton" id="NewsEditButton" to="/addNews"
         state={{elem:location.state.elem, newsNum: location.state.num}}>Редактировать новость</Link>
        <div className="NewsControlButton" id="NewsDeleteButton" onClick={(e) =>{DelNews(e)}}>Удалить новость</div>
        </div>:<></>}
    </div>)
}

export default NewsPage