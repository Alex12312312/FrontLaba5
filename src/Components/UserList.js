import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
function UserList(){
    const [users, setUsers] = useState([])
    const getUsers = () => {
        axios.get("http://localhost:8080/user/all", {headers:{
            Authorization: localStorage.session_id
        }}).then((response)=>{
            setUsers(response.data)
        })
    }
    useEffect(()=>{
        getUsers()
    }, [])
    const deleteUser = (event, userId) => {
        event.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/delete',
            headers: {'Authorization': Number(localStorage.session_id)},
            params: {user_id: userId}
        }).then((response)=>{
        }).catch((error) => {

        })
        getUsers()
    }
    return(<div className="sitePage" id="userListPage">
        <div id="userTable">
            {users.map((data, index)=>(<div className="userTableItem" key={"item" + data.id}>
                <div key={"RS" + data.id} className="tableRightSide">
                    <img className="NewNewsImageItem" src={`data:image/${data.avatar[0]};base64,${data.avatar[1]}`}></img>
                    <div>{data.login}</div>
                </div>
                <div key={"LS" + data.id} className="tableLeftSide">
                    <div  className="deleteUserButton" onClick={(e) => {deleteUser(e, data.id)}}>Удалить</div>
                    <Link className="deleteUserButton" to="/userEdit" state={{user: data}}>Редактировать</Link>
                </div>
            </div>))}
        </div>
    </div>)
}

export default UserList