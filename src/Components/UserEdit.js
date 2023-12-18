import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
function UserEdit(){
    const location = useLocation()
    const navigate = useNavigate()
    const [userID, setUserId] = useState(location.state.user.id)
    const [userLogin, setUserLogin] = useState(location.state.user.login)
    const [userEmail, setUserEmail] = useState(location.state.user.email)
    const [userPassword, setUserPassword] = useState(location.state.user.password)
    const [userRole, setUserRole] = useState(location.state.user.role)
    const [userEnterCount, setEnterCount] = useState(location.state.user.enterCounter)
    const [userAvatar, setUserAvatar] = useState(`data:image/${location.state.user.avatar[0]};base64,${location.state.user.avatar[1]}`)
    const acceptChanges = (event) => {
        event.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/edit',
            headers: {Authorization: localStorage.session_id},
            params: {
            user_id:userID
            },
            data: {email: userEmail,
            password: userPassword,
            role: userRole,
            login: userLogin,
            enter_counter: userEnterCount,
            avatar: userAvatar}
        }).then((response) =>{
            navigate(-1)
        })
    }
    const handleImageUpload = (event) =>{
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result;
            setUserAvatar(base64)
          };
      };
    return(
        <div className='sitePage' id="ProfilePage">
        <div id="lkPage">Страница пользователя {userLogin}</div>
        <div id="UserCart">
        <div id="ImagePlace">
        <img className='ProfileImage' src={userAvatar}></img>
        <input accept="image/png, image/jpeg, image/gif, image/jpg" type="file" id="ChangeImageArea" onChange={(e) => {handleImageUpload(e)}}/>
        </div>
        <div id="DataPlace">
            <div>ID пользователя: <input type="text" value={userID} onChange={(e) => {setUserId(e.target.value)}}></input></div>
            <div>Количество посещений: <input type="number" value={userEnterCount} onChange={(e) => {setEnterCount(e.target.value)}}></input></div>
            <div>Роль: <select name="Role" defaultValue={userRole} onChange={(e)=>{setUserRole(e.target.value)}}>
                <option value="user">Пользователь</option>
                <option value="moderator">Модератор</option>
                <option value="admin">Администратор</option>
                </select></div>
            <div>Логин пользователя: <input type="text" value={userLogin} onChange={(e) => {setUserLogin(e.target.value)}}></input></div>
            <div>email:<input type="text" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}}></input></div>
            <div>Пароль пользователя: <input type="text" value={userPassword} onChange={(e) => {setUserPassword(e.target.value)}}></input></div>
            <div id="AcceptChanges" onClick={(e)=>{acceptChanges(e)}}>Подтвердить изменения</div>
        </div>
        </div>
        </div>)
}

export default UserEdit