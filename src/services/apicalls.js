import axios from "axios";

export const bringAllArtists = async () => {
    const res = await axios.get("http://localhost:3000/api/artist") 
    return res.data
}


//login 
 export const userLogin = async (credentials) => {

      const res =  await axios.post('http://localhost:3000/auth/login' , credentials)
      const token = res.data.token
      return token
}