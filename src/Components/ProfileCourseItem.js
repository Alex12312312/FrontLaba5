function CourseItem(params){
    return(<div className="CourseItem">
    <img className="CourseItemIMG" src={params.image}/>{params.title}
    <button>Отписаться</button>
    </div>
    )
}

export default CourseItem