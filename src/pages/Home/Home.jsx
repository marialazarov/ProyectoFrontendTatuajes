import { useState } from "react";
import { useEffect } from "react";
import "./Home.css";

export const Home = () => {

    const [userName, setuserName] = useState('')
    const [userEmail, setuserEmail] = useState('')

    const inputHandler = (event) => {
         const inputName = event.target.name
         const inputValue = event.target.value

         if (inputName === 'name'){
            setuserName(inputValue)
         }
         if (inputName === 'email'){
            setuserEmail(inputValue)
         }
        
    }


        useEffect(() => {
       
            console.log(userName,'name')
            console.log(userEmail,'email')
        
        },[userName,userEmail])
   
   
   
        return (

        <div className="midiv">
            <input type="text" name="name" onChange={(e) => inputHandler(e)
            }></input>
              <input type="email" name="email" onChange={(e) => inputHandler(e)
            }></input>

        </div>

    )


};
