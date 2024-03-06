import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../Home/Home"
import { Register } from "../Register/Register"
import { Artist } from "../Artist/Artist"
import { Profile } from "../Profile/Profile"
import { Admin } from "../Admin/Admin"
import { Appointments } from "../Appointments/Appointments"
import { AdminAppointments } from "../AdminAppointments/AdminAppointments"
import { UserAppointments } from "../UserAppointments/UserAppointments"




export const Body = () => {


    return (
        <>
            <Routes>
                <Route path="*" element= {<Navigate to="/" />} />
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/artist' element={<Artist />}></Route>
        
                <Route path='/admin' element={<Admin />}></Route>
                <Route path='/createappointments' element={<Appointments />}></Route>
                <Route path='/myappointments' element={<UserAppointments />}></Route>
               
                <Route path='/everyappointment' element={<AdminAppointments />}></Route>
        
            </Routes>


        </>
    )
}