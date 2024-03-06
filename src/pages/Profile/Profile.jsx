import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../services/apicalls";
import './Profile.css';

export const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('decoded')) || {});
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(userData.name );
    const [newEmail, setNewEmail] = useState(userData.email);
    const [newPhone, setNewPhone] = useState(userData.phone);
    const [newUserName, setNewUserName] = useState(userData.username);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userData.username) {
            navigate('/register');
        }
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const updatedUserData = await updateProfile(token, userData.userId, {
                username: newUserName,
                name: newName,
                email: newEmail,
                phone: newPhone
                
            });
           
            localStorage.setItem('decoded', JSON.stringify(updatedUserData));
            setUserData(updatedUserData);
            setIsEditing(false);
            console.log("Perfil actualizado correctamente:", updatedUserData);
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
        setNewName(userData.name);
        setNewEmail(userData.email);
        setNewPhone(userData.phone);
        setNewUserName(userData.username);
    };

    return (
        <div className="profileDesign">
            <h1>Hello, {userData.username}</h1>
            <br />
            <h4>This is your id number: {userData.userId}</h4>
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
                    <h4>Name: {userData.name}</h4>
                    <br />
                    <h4>Email: {userData.email}</h4>
                    <br />
                    <h4>Phone: {userData.phone}</h4>
                    <br />
                    <button onClick={handleEditProfile}>Edit Profile</button>
                </>
            )}
        </div>
    );
};
