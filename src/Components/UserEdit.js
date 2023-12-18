import { useLocation } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
function UserEdit(){
    const location = useLocation()
    const [userID, setUserId] = useState(location.state.user.id)
    const [userLogin, setUserLogin] = useState(location.state.user.login)
    const [userEmail, setUserEmail] = useState(location.state.user.email)
    return(<div className="newItemPage"></div>)
}

export default UserEdit