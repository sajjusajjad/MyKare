import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Dashboard(props) {
    let isAdmin = false
    let usersArray = []
    let renderList = []
    const location = useLocation()
    
    if(location.state.role == 'admin'){
        isAdmin = true
        usersArray = JSON.parse(localStorage.getItem('users'))|| []
        
        usersArray.shift()
        
        renderList = usersArray.map((user, index) =>
        <div key={index}>
            <li>{user.name}</li></div>
        )
    }
    else{
        isAdmin = false
    }
    const navigate = useNavigate()
  return (
    <>
    <div>
    {isAdmin ?
    <div>
     <h2>List Of Users</h2> 
     {renderList}
    </div>

     :
     <p>Welcome {location.state.name}</p>}
</div>
<div>
    <button onClick={() => navigate('/') }>Logout</button>
</div>
</>
    
  )
}

export default Dashboard