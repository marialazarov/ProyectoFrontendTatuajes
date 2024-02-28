import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import "./Register.css"
import { useNavigate } from "react-router-dom";


export const Register = () =>{

        const [userData, setUserData] = useState({
            name: "", 
            email: "", 
            password: "",
        });
    
    const navigate = useNavigate()

        const inputHandler = (event) => {
            setUserData((prevState) => ({
                ...prevState, 
                [event.target.name]: event.target.value, //busca una copia que se llame asi y pon el valor de quien haya disparado el evento
            }));
        };
    
        //para sacar al usuario si no está registrado
       //useEffect(()=>{
       // navigate('/')
      // }, [])
    
        return (
            <>
            <img className="logohome" src="https://img.freepik.com/vector-gratis/ilustracion-vector-logo-estudio-tatuaje-vintage-equipos-monocromaticos-cruzados-profesionales_74855-11252.jpg"></img>
                <h1 className="welcome">REGISTER</h1>
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
                  </div>
            </>
        );
    };
    
    