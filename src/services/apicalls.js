import axios from "axios";
const API_URL= 'http://localhost:3000/api/users'

export const bringAllArtists = async () => {
    const res = await axios.get("http://localhost:3000/api/artist") 
    return res.data
}
export const deleteUser = async (token, id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data; 
    } catch (error) {
        throw new Error(error.response.data.message || "Error al eliminar el usuario");
    }
};

//acceder con autorización solo
export const bringAllUsers = async () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get("http://localhost:3000/api/users", config);
    return res.data.results;
};



export const createUsers = async (userData) => {
    try {
      const res = await axios.post('http://localhost:3000/auth/register',userData);
      return res.data.user;
    } catch (error) {
      throw error;
    }
  };

export const bringUserById = async(id)=>{
    const res = await axios.get(`${API_URL}/${id}`)
    return  res.data.user
    //bringUsersAppointments
}
//login 
 export const userLogin = async (credentials) => {

      const res =  await axios.post('http://localhost:3000/auth/login' , credentials)
      const token = res.data.token
      return token
}