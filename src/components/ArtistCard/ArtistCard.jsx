import "./ArtistCard.css"




export const ArtistCard = ({id,img,name,portfolio}) =>{

    return (
        <div className="cardContainer" key={id}>
            <img src={img}></img>
            <h3>{name}</h3>
            <h6>{portfolio}</h6>
    



        </div>
    )
}