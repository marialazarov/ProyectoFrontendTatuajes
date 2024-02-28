import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

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
           
        </div>
    )
}