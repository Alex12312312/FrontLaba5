import axios from 'axios'
import React, { useContext, useState, useEffect } from "react";

const Podval = () => {
    const [currentTime, setTime] = useState("Соединение с сервером...")
    const getTime = () =>{
        axios({
            method: 'get',
            url: 'http://localhost:8080/time/'
        }).then((response) => {
            setTime(response.data)
        }).catch((error)=>{setTime("Связь с Университетом потеряна!")})
    }
    useEffect(()=>{
    getTime()
    const intervalVal = setInterval(getTime, 5000)
    return () => {
        clearInterval(intervalVal);
      };
})
    return(<footer id="sitePodval">
        <div id='TimePlace'>
           Местное время: {currentTime}
        </div>
    </footer>)
}

export default Podval