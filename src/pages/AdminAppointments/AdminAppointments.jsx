import { useNavigate } from "react-router-dom";
import { bringAllAppointments, deleteAppointment } from "../../services/apicalls";
import { useEffect, useState } from "react";
import './AdminAppointments.css'

export const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [inputValue, setInputValue] = useState('')
    const decoded = JSON.parse(localStorage.getItem("decoded"));
    const token = localStorage.getItem("token");
    const navigate = useNavigate() // Le pasas como parametro a donde quieres ir

    const inputHandler = (e) => {
        setInputValue(e.target.value)
    }
   
    const deleteAppointmentHandler = async (id) => {
       
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            try {
                await deleteAppointment(token, id); // Llama a la función para eliminar el usuario
                // Después de eliminar, actualiza la lista de usuarios
                bringAllAppointments().then((res) => {
                    setAppointments(res);
                    console.log(res);
                });
            } catch (error) {
                console.error("Error al eliminar la cita:", error);
            }
        }
    };





    //para traer las citas sin tener que pulsar un botón
    useEffect(() => {
        if (appointments.length === 0) {
            bringAllAppointments().then((appointments) => {
                setAppointments(appointments);
            });
        }
        console.log(appointments)
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
                    {/* Agregar botón para eliminar usuario */}
                    <div className="deleteButton">
                        <button onClick={() => deleteAppointmentHandler(appointment.id)}>Eliminar</button>
                    </div>
                </div>
            ))
        ) : null}
    </div>
</div>

        </>
    );
};

        
        
        
        
        
        
 