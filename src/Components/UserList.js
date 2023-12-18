import { useEffect, useState } from "react"
import axios from "axios"
function UserList(){
    const [users, setUsers] = useState([])
    const getUsers = () => {
        axios.get("http://localhost:8080/user/all", {headers:{
            Authorization: localStorage.session_id
        }}).then((response)=>{
            console.log(response.data)
            setUsers(response.data)
            console.log(users)
        })
    }
    useEffect(()=>{
        getUsers()
    }, [])
    return(<div className="sitePage" id="userListPage">
        <div id="userTable">
            {users.map((data, index)=>(<div className="userTableItem" id={"item" + data.id}>
                <div id={"RS" + data.id} className="tableRightSide">
                    <img src={`data:image/${data.avatar[0]};base64,${data.avatar[1]}`}></img>
                </div>
                <div id={"LS" + data.id} className="tableLeftSide"></div>
            </div>))}
        </div>
    </div>)
}

export default UserList