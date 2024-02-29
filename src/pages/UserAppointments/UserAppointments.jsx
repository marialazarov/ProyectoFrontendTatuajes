import { useEffect, useState } from "react";
import { bringAppointmentById } from "../../services/apicalls"; // Importa la función para obtener los appointments por el ID del usuario

export const UserAppointments = () => {
    const [userAppointments, setUserAppointments] = useState([]); // Estado para almacenar los appointments del usuario

    useEffect(() => {
        // Función para obtener los appointments del usuario
        const fetchUserAppointments = async () => {
            try {
                // Obtener el ID del usuario del localStorage
                const userId = JSON.parse(localStorage.getItem('decoded')).userId;

                // Verificar si el userId existe
                if (!userId) {
                    console.error("No se encontró el ID del usuario en el localStorage");
                    return;
                }

                // Llamar a la función para obtener los appointments del usuario por su ID
                const appointments = await bringAppointmentById(userId);

                // Almacenar los appointments en el estado del componente
                setUserAppointments(appointments);
            } catch (error) {
                console.error("Error al obtener los appointments del usuario:", error);
            }
        };

        // Llamar a la función para obtener los appointments del usuario
        fetchUserAppointments();
    }, []); // Ejecutar solo una vez al cargar el componente

    return (
        <div>
            <h2>Your Appointments</h2>
            {userAppointments.length > 0 ? (
                <ul>
                    {userAppointments.map(appointment => (
                        <li key={appointment.id}>
                            <p>NÚMERO DEL ID DE LA CITA: {appointment.id}</p>
                            <p>FECHA {appointment.date}</p>
                            <p>hora {appointment.hour}</p>
                            {/* Mostrar más detalles de los appointments según sea necesario */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay appointments disponibles para este usuario.</p>
            )}
        </div>
    );
};
