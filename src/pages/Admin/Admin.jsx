import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { bringAllUsers, deleteUser } from "../../services/apicalls";
import './Admin.css'






export const Admin = () => {
    const [users, setUsers] = useState([]);
    const decoded = JSON.parse(localStorage.getItem("decoded"));
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const deleteUserHandler = async (id) => {
        // Preguntar al usuario si está seguro de eliminar el usuario
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            try {
                await deleteUser(token, id); // Llama a la función para eliminar el usuario
                // Después de eliminar, actualiza la lista de usuarios
                bringAllUsers().then((res) => {
                    setUsers(res);
                    console.log(res);
                });
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
            }
        }
    };

    useEffect(() => {
        if (decoded.userRoles === "client") {
            navigate("/");
        } else {
            bringAllUsers().then((res) => {
                setUsers(res);
                console.log(res);
            });
        }
    }, []);

    return (
        <>
          <div className="adminDesign">
    <div className="userList">
        {users.length > 0 ? (
            users.map((user) => (
                <div className="userRow" key={user.id}>
                    <div>
                        <h6>Id: {user.id}</h6>
                        <h6>Username: {user.username}</h6>
                        <h6>Email: {user.email}</h6>
                    </div>
                    {/* Agregar botón para eliminar usuario */}
                    <div className="deleteButton">
                        <button onClick={() => deleteUserHandler(user.id)}>Eliminar</button>
                    </div>
                </div>
            ))
        ) : null}
    </div>
</div>

        </>
    );
};
