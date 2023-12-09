import axios from 'axios'
import React, { useContext, useState, useEffect } from "react";

const Podval = () => {
    const [currentTime, setTime] = useState()
    const getTime = () =>{
        axios({
            method: 'get',
            url: 'http://localhost:8080/time/'
        }).then((response) => {
            setTime(response.data)
        }).catch((error)=>{setTime("Связь с Университетом потеряна!")})
    }
    setInterval(function(){
        getTime()
    }, 30000)
    return(<footer id="sitePodval" onLoad={()=>{getTime()}}>
        <div id='TimePlace'>
           Местное время: {currentTime}
        </div>
    </footer>)
}

export default Podval