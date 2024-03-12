import { useEffect, useState } from "react";
import { createAppointment } from "../../services/apicalls"; 
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { userData1 } from "../userSlice";

export const Appointments = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    user_id: "",
    artist_id: "",
    date: "",
    hour: ""
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const dispatch = useDispatch();
    const userRdxData = useSelector(userData1)
    const token = userRdxData.token
    const decoded = userRdxData.userData
  
  useEffect(() => {
    if (!decoded) {
      navigate('/register');
    }
  }, []);

  const inputHandler = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createAppointment(userData);
      console.log("Cita creada exitosamente");
      setRegistrationSuccess(true); // Establece el estado de éxito de registro en verdadero
    
    } catch (error) {
      console.error("Error al crear la cita:", error);
    }
  };

  return (
    <>
      <h1>Registro de Cita</h1>
      <div>
        {/* Popup de registro exitoso */}
        {registrationSuccess && (
          <div className="registration-success-popup">
            <p>¡Cita registrada correctamente!</p>
          </div>
        )}

        {/* Campos del formulario */}
        <CustomInput
          placeholder="ID de Usuario"
          type="number"
          name="user_id"
          value={userData.user_id}
          handler={inputHandler}
        />
        <CustomInput
          placeholder="ID de Artista"
          type="number"
          name="artist_id"
          value={userData.artist_id}
          handler={inputHandler}
        />
        <CustomInput
          placeholder="Fecha"
          type="date"
          name="date"
          value={userData.date}
          handler={inputHandler}
        />
        <CustomInput
          placeholder="Hora"
          type="time"
          name="hour"
          value={userData.hour}
          handler={inputHandler}
        />
        <button onClick={handleSubmit}>Aceptar</button>
      </div>
    </>
  );
};
