import { useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { createUsers } from "../../services/apicalls"; // Importa la función para crear usuarios
import { useNavigate } from "react-router-dom";
import './Register.css'

export const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    surname: "",
    email: "",
    password: "",
    phone: ""
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Estado para el registro exitoso

  // Maneja los cambios en los campos del formulario
  const inputHandler = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  };

  // Maneja el envío del formulario para crear un nuevo usuario
  const registerUserHandler = async () => {
    try {
      // Llama a la función para crear un usuario con los datos del estado userData
      await createUsers(userData);
      // Si el usuario se crea con éxito, puedes mostrar la ventana emergente y redirigir a otra página
      setRegistrationSuccess(true); // Establece el estado de registro exitoso en verdadero
      setTimeout(() => {
        navigate("/"); // Redirige a la página de inicio después del registro exitoso
      }, 2000); // Redirige después de 2 segundos (2000 ms)
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <>
      <h1 className="registrodeusuario">Registro de Usuario</h1>
      <div>
        {/* Ventana emergente de registro exitoso */}
        {registrationSuccess && (
          <div className="registration-success-popup">
            <p>¡Usuario registrado correctamente!</p>
          </div>
        )}
        {/* Campos del formulario */}
        <CustomInput
          placeholder="Nombre"
          type="text"
          name="name"
          value={userData.name}
          handler={inputHandler}
        />
        <CustomInput
          placeholder="Apellido"
          type="text"
          name="surname"
          value={userData.surname}
          handler={inputHandler}
        />
        <CustomInput
          placeholder="Nombre de Usuario"
          type="text"
          name="username"
          value={userData.username}
          handler={inputHandler}
        />
        <CustomInput
          placeholder="Correo Electrónico"
          type="email"
          name="email"
          value={userData.email}
          handler={inputHandler}
        />
        <CustomInput
          placeholder="Contraseña"
          type="password"
          name="password"
          value={userData.password}
          handler={inputHandler}
        />
        <CustomInput
          placeholder="Teléfono"
          type="text"
          name="phone"
          value={userData.phone}
          handler={inputHandler}
        />
        <button onClick={registerUserHandler}>Registrarse</button>
      </div>
    </>
  );
};
