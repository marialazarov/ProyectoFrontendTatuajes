import React, { useEffect, useState } from "react";
import { bringAppointmentById, updateAppointment } from "../../services/apicalls"; 
import './UserAppointments.css'
import { useDispatch, useSelector } from "react-redux";
import { userData1 } from "../userSlice";

export const UserAppointments = () => {
    const [userAppointments, setUserAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [newDate, setNewDate] = useState('');
    const [newHour, setNewHour] = useState('');
    const dispatch = useDispatch();
    const userRdxData = useSelector(userData1)
    const token = userRdxData.token
    const decoded = userRdxData.userData

    useEffect(() => {
        const fetchUserAppointments = async () => {
            try {
                const userId = decoded.userId
                if (!userId) {
                    console.error("No se encontró el ID del usuario en el localStorage");
                    return;
                }
                const appointments = await bringAppointmentById(userId);
                setUserAppointments(appointments);
            } catch (error) {
                console.error("Error al obtener los appointments del usuario:", error);
            }
        };

        fetchUserAppointments();
    }, []);

    const modifyAppointmentHandler = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const updateAppointmentHandler = async () => {
        try {
            await updateAppointment(selectedAppointment.id, newDate, newHour);
            // Actualizar el estado de las citas del usuario después de la modificación
            const updatedAppointments = userAppointments.map(appointment => {
                if (appointment.id === selectedAppointment.id) {
                    return { ...appointment, date: newDate, hour: newHour };
                }
                return appointment;
            });
            setUserAppointments(updatedAppointments);
            setSelectedAppointment(null); // Limpiar la cita seleccionada después de la actualización
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
        }
    };

    return (
        <>
            <div>
                <h2>Your Appointments</h2>
                {userAppointments.length > 0 ? (
                    <ul>
                        {userAppointments.map(appointment => (
                            <div className="appointmentList" key={appointment.id}>
                                <p>APPOINTMENT ID: {appointment.id}</p>
                                <p>Date {appointment.date}</p>
                                <p>Hour {appointment.hour}</p>
                                <button onClick={() => modifyAppointmentHandler(appointment)}>Modify</button>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No hay appointments disponibles para este usuario.</p>
                )}
            </div>

            {selectedAppointment && (
                <div className="modifyForm">
                    <h3>Modificar Cita</h3>
                    <input placeholder="Date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                    <input placeholder="Hour" type="time" value={newHour} onChange={(e) => setNewHour(e.target.value)} />
                    <button onClick={updateAppointmentHandler}>Guardar Cambios</button>
                </div>
            )}
        </>
    );
};
