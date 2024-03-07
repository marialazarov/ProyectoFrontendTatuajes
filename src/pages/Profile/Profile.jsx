import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../services/apicalls";
import './Profile.css';
import { useDispatch, useSelector } from "react-redux";
import { userData1 } from "../userSlice";

export const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('decoded')) || {});
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(userData.name );
    const [newEmail, setNewEmail] = useState(userData.email);
    const [newPhone, setNewPhone] = useState(userData.phone);
    const [newUserName, setNewUserName] = useState(userData.username);
    const dispatch = useDispatch();
    const userRdxData = useSelector(userData1)
    const token = userRdxData.token
    const decoded = userRdxData.userData

    useEffect(() => {
        if (!decoded) {
            navigate('/register');
        }
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const updatedUserData = await updateProfile(token, decoded.userId, {
                username: newUserName,
                name: newName,
                email: newEmail,
                phone: newPhone
                
            });
           
            
            setUserData(decoded);
            setIsEditing(false);
            console.log("Perfil actualizado correctamente:", decoded);
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Restaurar los valores originales del usuario al cancelar la edición
        setNewName(decoded.name);
        setNewEmail(decoded.email);
        setNewPhone(decoded.phone);
        setNewUserName(decoded.username);
    };

    return (
        <div className="profileDesign">
            <h1>Hello, {decoded.username}</h1>
            <br />
            <h4>This is your id number: {decoded.userId}</h4>
            <br />
            {isEditing ? (
                <>
                <div className="inputs"></div>
                    <h4>Name: <input className="newValue" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /></h4>
                    <br />
                    <h4>Username: <input className="newValue" type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} /></h4>
                    <h4>Email: <input className="newValue" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} /></h4>
                    <br />
                    <h4>Phone: <input className="newValue" type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} /></h4>
                    <br />
                    <button onClick={handleUpdateProfile}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                    
                </>
            ) : (
                <>
                    <h4>Name: {decoded.name}</h4>
                    <br />
                    <h4>Email: {decoded.email}</h4>
                    <br />
                    <h4>Phone: {decoded.phone}</h4>
                    <br />
                    <button onClick={handleEditProfile}>Edit Profile</button>
                </>
            )}
        </div>
    );
};
