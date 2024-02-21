import { useState } from "react";
import { useEffect } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringAllArtists} from "../../services/apicalls";


//Un login
export const Home = () => {
    const [userData, setUserData] = useState({
        name: "", //esto seria email en mi backend
        email: "", //esto seria password en mi backend
        password: "",
    })

    const inputHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState, //haz una copia del estado actual
            [event.target.name]: event.target.value, //busca una copia que se llame asi y pon el valor de quien haya disparado el evento
        }))
    }

    //Botón para ver Artistas **implementar en Admin y en Home para ver Artistas
    const buttonHandler = () => {
      bringAllArtists()
      .then((res)=>{
        console.log(res)
      })

    
    }

    useEffect(() => {
        //console.log(userData, "user data");
    }, [userData])

    return (
        <>
            <h1>LOGIN</h1>
            <div className="midiv">
                <CustomInput
                    type={"text"}
                    name={"name"}
                    handler={inputHandler}
                ></CustomInput>
                <CustomInput
                    type={"email"}
                    name={"email"}
                    handler={inputHandler}
                ></CustomInput>
                <CustomInput
                    type={"password"}
                    name={"password"}
                    handler={inputHandler}
                ></CustomInput>
                <div className="apiCallButton"
                onClick={buttonHandler}><h4>TATUADORES</h4>
                </div>
            </div>
        </>
    )
}
