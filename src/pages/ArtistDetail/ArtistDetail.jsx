import { useEffect } from "react"
import { bringUserById } from "../../services/apicalls"

export const ArtistDetail = () => {

   const id = localStorage.getItem('userId')
   

    useEffect(()=> {
        bringUserById(id).then((res) => {
            console.log(res)
        })
    },[])
}
   // const selectedArtist = JSON.parse(localStorage.getItem('details'))
    
