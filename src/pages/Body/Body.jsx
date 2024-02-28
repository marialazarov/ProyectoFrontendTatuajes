import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../Home/Home"
import { Register } from "../Register/Register"
import { Artist } from "../Artist/Artist"
import { ArtistDetail } from "../ArtistDetail/ArtistDetail"
import { Profile } from "../Profile/Profile"


export const Body = () => {


    return (
        <>
            <Routes>
                <Route path="*" element= {<Navigate to="/" />} />
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/artist' element={<Artist />}></Route>
                <Route path='/artistdetail' element={<ArtistDetail />}></Route>
        
            </Routes>


        </>
    )
}