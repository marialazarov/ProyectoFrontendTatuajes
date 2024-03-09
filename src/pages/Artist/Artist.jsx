import { useState } from "react";
import { useEffect } from "react";
import "./Artist.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringAllArtists } from "../../services/apicalls";
import { ArtistCard } from "../../components/ArtistCard/ArtistCard";
import { useNavigate } from "react-router-dom";


export const Artist = () => {
    const [artists, setArtists] = useState([]);
    const [inputValue, setInputValue] = useState('')

    const navigate = useNavigate() // Le pasas como parametro a donde quieres ir

    const inputHandler = (e) => {
        setInputValue(e.target.value)
    }
   




    //para traer los artistas sin tener que pulsar un botón
    useEffect(() => {
        if (artists.length === 0) {
            bringAllArtists().then((artists) => {
                setArtists(artists);
            });
        }
        console.log(artists)
    }, [artists]);

    //useEffect(() => {
    //  artists.forEach((artist)=> {
    //    if (inputValue === artist.name) {
    //        console.log(inputValue)
       // }
    //  })

   // }, [inputValue]);

    return (
        <>
        <div className="miDiv">
           
        
            </div>
            <img className="logo" src="https://img.freepik.com/vector-gratis/ilustracion-vector-logo-estudio-tatuaje-vintage-equipos-monocromaticos-cruzados-profesionales_74855-11252.jpg"></img>



            <div>
                <div className="tatuadores">
                {artists.length > 0 ? (
                <>
                        
                            {artists.map((artist) => {
                                return (
                                    
                                     <div className="artist-card" onClick={() => viewArtistDetail(artist.id)}>
                                <ArtistCard
                                    id={artist.id}
                                    img={artist.img}
                                    name={artist.name}
                                    portfolio={artist.portfolio}
                                >
                                </ArtistCard>
                              </div>
                               
                            );
                            })}
                        </>
                    ) : null }
                   
                
             
            </div>
            </div>
      </>
    );
};



