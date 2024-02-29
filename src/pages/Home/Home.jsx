import { useState } from "react";
import { useEffect } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringAllArtists, userLogin } from "../../services/apicalls";
import { ArtistCard } from "../../components/ArtistCard/ArtistCard";
import { Header

} from "../../components/Header/Header";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
//VISTA login
export const Home = () => {
    const [artists, setArtists] = useState([]);
    const [userData, setUserData] = useState({
        email: "", 
        password: "",
    });

    const inputHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState, //haz una copia del estado actual
            [event.target.name]: event.target.value, //busca una copia que se llame asi y pon el valor de quien haya disparado el evento
        }));
    };

    const navigate = useNavigate()

 
    const buttonHandler = () => {
    
        userLogin(userData).then((token) => {
            localStorage.setItem('token', token);
            const decodedtoken = jwtDecode(token)
            localStorage.setItem('decoded', JSON.stringify(decodedtoken));
    
            navigate('/profile')

            
        })
      
    };

    useEffect(() => {
       
    }, [artists]);

    useEffect(() => {
    }, [userData]);

    return (
        <>
        <img className="logohome" src="https://img.freepik.com/vector-gratis/ilustracion-vector-logo-estudio-tatuaje-vintage-equipos-monocromaticos-cruzados-profesionales_74855-11252.jpg"></img>
            <h1 className="welcome">WELCOME</h1>
            <div className="midiv">
                <CustomInput
                placeholder={'email'}
                    type={"email"}
                    name={"email"}
                    handler={inputHandler}
                ></CustomInput>
                <CustomInput
                placeholder={'password'}
                    type={"password"}
                    name={"password"}
                    handler={inputHandler}
                ></CustomInput>

                <div className="apiCallButton" onClick={buttonHandler}>
                    <h4>LOGIN</h4> 
                </div>

            </div>
        </>
    );
};

