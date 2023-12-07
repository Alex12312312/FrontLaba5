import React, { useContext, useEffect, useState } from "react";
import axios, { all } from "axios";

function SiteBody(){
    const [allNews, setAllNews] = useState([])
    const [currentNewsNum, setCurNews] = useState(0)
    const [curIMG, setCurIMGNum] = useState(0)
    useEffect(()=>{
        const getNews = () => {
            axios
            .get("http://localhost:8080/news/all")
            .then((response) => {
                const gotData  = response.data.map(element=>{return [
                    element.title, 
                    element.description, 
                    element.user_login,
                    element.images.map(image=>{return `data:image/png;base64,${image}`})
                ]
            }
            )
                setAllNews(gotData)
            })
        }
    getNews()
    }, [])
    const setPreviosImage = () => {
        if((curIMG - 1) >= 0){
            setCurIMGNum(curIMG - 1)
        }
    }
    const setNextImage = () => {
        if((curIMG + 1) < allNews[currentNewsNum][3].length){
            setCurIMGNum(curIMG + 1)
        }
    }
    return(
    <div id="mainBody">
        <div id="newsBlockHeader">Актуальные новости нашего Университета</div>
        <div id="newsBlock">
            <div id="currentNewsBlock">
        {allNews.length > 0 && allNews[currentNewsNum]  && allNews[currentNewsNum][3] && (<>
      <img id="currentImage" src={allNews[currentNewsNum][3][curIMG]} alt="News Image"/>
      <div id="currentNewsText">
                <div id="textHeader">
                <div className="ImageButton" id="PreviosImage" onClick={() => {setPreviosImage()}}>{"<"}</div>
                <div id="textInfo">
                <div id="TextTitle">{allNews[currentNewsNum][0]}</div>
                <div id="AuthorInfo">Автор: {allNews[currentNewsNum][2]}</div>
                </div>
                <div className="ImageButton" id="NextImage" onClick={() => {setNextImage()}}>{">"}</div>
                </div>
                <div id="newsText">
                    {allNews[currentNewsNum][1]}
                </div>
            </div>
            </>
            )}
            </div>
            <div id="otherNewsBlock">
            {allNews.map((text, index) => (
        <div className="newsItem" key={"newsItem" + index} title={text[1]} onClick={() => {setCurNews(index)
        setCurIMGNum(0)}}>
            <img className="newsItemIMG" key={"newsItemImage" + index} src={text[3][0]}></img>
            {text[0]}
        </div>
    ))}
            </div>
        </div>
    </div>
    )
}

export default SiteBody