import { useEffect, useState } from "react";
import { bringAllAppointments, deleteAppointment, updateAppointment } from "../../services/apicalls";
import './AdminAppointments.css'
import { useSelector } from "react-redux";
import { userData1 } from "../userSlice";

export const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [inputValue, setInputValue] = useState('')
    const userRdxData = useSelector(userData1)
    const token = userRdxData.token
    const decoded = userRdxData.userData
    


    const inputHandler = (e) => {
        setInputValue(e.target.value)
    }

    const deleteAppointmentHandler = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta cita?");
        if (confirmDelete) {
            try {
                await deleteAppointment(token, id);
                bringAllAppointments().then((res) => {
                    setAppointments(res);
                });
            } catch (error) {
                console.error("Error al eliminar la cita:", error);
            }
        }
    };

    const modifyAppointmentHandler = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const updateAppointmentHandler = async (token) => {
        try {
            await updateAppointment(token, selectedAppointment.id, selectedAppointment);
            bringAllAppointments().then((res) => {
                setAppointments(res);
            });
            setSelectedAppointment(null); // Limpiar la cita seleccionada después de la actualización
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
        }
    };

    useEffect(() => {
        if (appointments.length === 0) {
            bringAllAppointments().then((appointments) => {
                setAppointments(appointments);
            });
        }
    }, [appointments]);

    return (
        <>
            <div className="adminDesign">
                <div className="appointmentList">
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <div className="appointmentRow" key={appointment.id}>
                                <div>
                                    <h6>Appointment id: {appointment.id}</h6>
                                    <h6>CLIENT ID: {appointment.user_id}</h6>
                                    <h6>ARTIST ID: {appointment.artist_id}</h6>
                                    <h6>DATE: {appointment.date}</h6>
                                    <h6>HOUR: {appointment.hour}</h6>
                                </div>
                                <div className="buttons">
                                    <button onClick={() => deleteAppointmentHandler(appointment.id)}>Eliminar</button>
                                    <button onClick={() => modifyAppointmentHandler(appointment)}>Modificar</button>
                                </div>
                            </div>
                        ))
                    ) : null}
                </div>
            </div>

            {selectedAppointment && (
                <div className="modifyForm">
                    <h3>Modificar Cita</h3>
                    <input type="number" value={selectedAppointment.user_id} onChange={(e) => setSelectedAppointment({...selectedAppointment, user_id: e.target.value})} />
                    <input type="number" value={selectedAppointment.artist_id} onChange={(e) => setSelectedAppointment({...selectedAppointment, artist_id: e.target.value})} />
                    <input type="text" value={selectedAppointment.date} onChange={(e) => setSelectedAppointment({...selectedAppointment, date: e.target.value})} />
                    <input type="text" value={selectedAppointment.hour} onChange={(e) => setSelectedAppointment({...selectedAppointment, hour: e.target.value})} />
                    <button onClick={updateAppointmentHandler}>Guardar Cambios</button>
                </div>
            )}
        </>
    );
};
