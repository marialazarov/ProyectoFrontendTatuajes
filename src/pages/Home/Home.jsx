import { useState } from "react";
import { useEffect } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringAllArtists } from "../../services/apicalls";
import { ArtistCard } from "../../components/ArtistCard/ArtistCard";
import { Header

} from "../../components/Header/Header";
//VISTA login
export const Home = () => {
    const [artists, setArtists] = useState([]);
    const [userData, setUserData] = useState({
        name: "", //esto seria email en mi backend
        email: "", //esto seria password en mi backend
        password: "",
    });

    const inputHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState, //haz una copia del estado actual
            [event.target.name]: event.target.value, //busca una copia que se llame asi y pon el valor de quien haya disparado el evento
        }));
    };

    //Botón para ver Artistas **implementar en Admin y en Home para ver Artistas
    const buttonHandler = () => {
        bringAllArtists().then((artists) => {
            setArtists(artists);
        });
    };

    useEffect(() => {
        console.log(artists)
    }, [artists]);

    useEffect(() => {
        //console.log(userData, "user data");
    }, [userData]);

    return (
        <>
        <img className="logo" src="https://img.freepik.com/vector-gratis/ilustracion-vector-logo-estudio-tatuaje-vintage-equipos-monocromaticos-cruzados-profesionales_74855-11252.jpg"></img>
            <h1 className="login">LOGIN</h1>
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
                <div className="apiCallButton" onClick={buttonHandler}>
                    <h4>TATUADORES</h4>
                </div>


                {artists.length > 0 && (
                    <>
                        {artists.map((artist) => {
                            return <ArtistCard
                            id= {artist.id}
                            img={artist.img}
                            name= {artist.name}
                            portfolio ={artist.portfolio}
                        >     
                            </ArtistCard>
                
                        })}
                    </>
                )
                }

            </div>
        </>
    );
};

