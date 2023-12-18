import { useContext } from "react"
import { Link } from "react-router-dom"

function ControlPanel(){

    return(
        <div id="ControlPanelField">
            <div id="ControlPanelTitle">Панель управления сайта Университета</div>
            <div id="ControlPanelButtons">
                <Link to="/addNews" className="ControlPanelButton"> Добавить новость</Link>
                <Link to="/addCourse" className="ControlPanelButton"> Добавить курс</Link>
                {localStorage.user_role == "admin"? <Link to="/userList" className="ControlPanelButton">Управление пользователями</Link>:<></>}
            </div>
        </div>)
}

export default ControlPanel