import { useState } from "react";
import { useEffect } from "react";
import "./Artist.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringAllArtists } from "../../services/apicalls";
import { ArtistCard } from "../../components/ArtistCard/ArtistCard";


export const Artist = () => {
    const [artists, setArtists] = useState([]);
    const [inputValue, setInputValue] = useState('')

    const inputHandler = (e) => {
        setInputValue(e.target.value)
    }
   
   
    const buttonHandler = () => {
        let artistaSeleccionado = {} 
        artists.forEach((artist) => {
            if (inputValue === artist.name) {
                artistaSeleccionado = artist
                console.log(artist);
            }
        });
        
    };

    //para traer los artistas sin tener que pulsar un botón
    useEffect(() => {
        if (artists.length === 0) {
            bringAllArtists().then((artists) => {
                setArtists(artists);
            });
        }
        console.log(artists)
    }, [artists]);

    useEffect(() => {
      artists.forEach((artist)=> {
        if (inputValue === artist.name) {
            console.log(inputValue)
        }
      })

    }, [inputValue]);

    return (
        <>
        <div className="miDiv">
            <CustomInput
                type={"text"}
                name={"name"}
                handler={inputHandler}
            ></CustomInput>
            <button onClick={buttonHandler}>BUSCAR</button>
            </div>
            <img className="logo" src="https://img.freepik.com/vector-gratis/ilustracion-vector-logo-estudio-tatuaje-vintage-equipos-monocromaticos-cruzados-profesionales_74855-11252.jpg"></img>



            <div>
                <div className="tatuadores">
                    {artists.length > 0 && (
                        <>
                            {artists.map((artist) => {
                                return <ArtistCard
                                    id={artist.id}
                                    img={artist.img}
                                    name={artist.name}
                                    portfolio={artist.portfolio}
                                >
                                </ArtistCard>

                            })}
                        </>
                    )
                    }
                </div>
            </div>
        </>
    );
};

