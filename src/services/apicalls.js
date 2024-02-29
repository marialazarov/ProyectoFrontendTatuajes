import axios from "axios";
const API_URL= 'http://localhost:3000/api/users'

export const bringAllArtists = async () => {
    const res = await axios.get("http://localhost:3000/api/artist") 
    return res.data
}


export const bringUserById = async(id)=>{
    const res = await axios.get(`${API_URL}/${id}`)
    return  res.data
    //bringUsersAppointments
}
//login 
 export const userLogin = async (credentials) => {

      const res =  await axios.post('http://localhost:3000/auth/login' , credentials)
      const token = res.data.token
      return token
}