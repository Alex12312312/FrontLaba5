import axios from 'axios'
import styles from '../index.css'
import React, { useContext, useState, useEffect } from "react";
function CoursesPage(){
    const [items, setItems] = useState([])
    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:8080/course/all')
            .then((response) => {
            console.log(response)
            const data = response.data.map(elem=>{return [elem.name,`data:image/png;base64,${elem.image}`, elem.description]});
            setItems(data);})
        };
    fetchData()
    }, [])
    return(<div className='CoursesPage'>
         {items.map((text, index) => (
    <div key={"item"+index} className="CoursePageItem"  title={text[2]}><div key={'text' + index}>{text[0]}</div>
    <img className="CourseItemIMG" key={"image" + index} src={text[1]}></img>
    <button>Записаться</button></div>
    ))}
    </div>)
}

export default CoursesPage