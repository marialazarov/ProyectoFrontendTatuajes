import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './Profile.css'
export const Profile = () =>{
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem('decoded'))
     const token = localStorage.getItem('token')
   

    useEffect(() => {
        if (!userData){
            navigate('/register')
        }
    },
         [])

   
    return(
        
        <div className="profileDesign">
            <h1>Hello,{userData.username}</h1>
            <h4>Name:{userData.name} </h4>
            <h4>Surname:{userData.surname} </h4>
            <h4>Email:{userData.email} </h4>
            <h4>Phone:{userData.phone} </h4>
          
        </div>
    )
}