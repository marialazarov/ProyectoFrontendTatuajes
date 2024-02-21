import axios from "axios";

export const bringAllArtists = async () => {
    const res = await axios.get("http://localhost:3000/api/artist") 
    return res.data
}