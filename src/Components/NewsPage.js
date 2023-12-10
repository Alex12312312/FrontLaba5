import { useState } from "react"
import { useLocation } from "react-router-dom"
function NewsPage(){
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
    </div>)
}

export default NewsPage