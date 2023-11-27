function Slide(props){
    return(<div className="slideItem">
        <img title="imgOfSlide" className="slideImg" src={props.imgSrc} alt="nothing"></img>
        <div className="descTextPlace">{props.text}</div>
    </div>
    )
}

export default Slide