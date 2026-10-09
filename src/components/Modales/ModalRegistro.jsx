import { useState } from "react";
import { useApp } from "../../context/Contexto"
import App_alert from "../alerts/alerts";


export const ModalRegistro = () => {

    const {isRegisterOpen, setIsRegisterOpen, register, setIsLoginOpen} = useApp();

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        fecha: "",
        cupon: ""
    });

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState("");
    const [tipoAlerta, setTipoAlerta] = useState("");

    if (!isRegisterOpen) {
        return null;
        
    }

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarFecha = (stringFecha) => {
    const anioNac = parseInt(stringFecha.substring(0,4));
    if (isNaN(anioNac)) {
        setMensajeAlerta("Fecha Ingresada No Valida")
        setTipoAlerta("danger");
        setMostrarAlerta(true)
        return false;

        
    }
    const anioActual = new Date().getFullYear();
    const maximo = anioActual - 90;
    const minimo = anioActual-10;


    if (anioNac < maximo) {
        setMensajeAlerta("La fecha de nacimiento supera el limite de 90 años de antiguedad");
        setTipoAlerta("danger");
        setMostrarAlerta(true);
        return false;
    }

    if (anioNac > minimo) {
        setMensajeAlerta("Debes tener al menos 10 años de edad para poder registrate en Pasteleria Mil Sabores");
        setTipoAlerta("danger");
        setMostrarAlerta(true);
        return false   
    }

        return true;


  };

    const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeAlerta("");

    const {nombre,apellido,correo,password,fecha,cupon} = formData;
    const cuponValido = "FELICES50";
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;


    if (nombre=='' || nombre.length <3 ) {
        setMensajeAlerta("El nombre no puede estar vacio y debe tener al menos 3 caracteres");
        setTipoAlerta("danger");
        setMostrarAlerta(true);
        return; 
    }

    if (apellido=='' || apellido.length <3 ) {
        setMensajeAlerta("El apellido no puede estar vacio y debe tener al menos 3 caracteres");
        setTipoAlerta("danger");
        setMostrarAlerta(true);
        return; 
    }

    if (!regexCorreo.test(correo)) {
        setMensajeAlerta("El correo no cumple con el formato correcto");
        setTipoAlerta("danger");
        setMostrarAlerta(true);
        return;
    }

    if (!regexPassword.test(password)) {
        setMensajeAlerta("La contraseña debe tener como mínimo 6 caracteres, incluir una letra y un numero");
        setTipoAlerta("danger");
        setMostrarAlerta(true);
        return;
        
    }

    if (cupon.trim()!=='' && cupon.trim() !== cuponValido) {
        setMensajeAlerta("Cupón no valido");
        setTipoAlerta("danger");
        setMostrarAlerta(true);
        return;
        
    }

    if (!fecha) {
        setMensajeAlerta("Debes seleccionar tu fecha de nacimiento");
        setTipoAlerta("danger");
        setMostrarAlerta(true);
        return;
        
    }

    if (!validarFecha(fecha)) {
        return;
        
    }

  return(
    <>
    <App_alert mostrarAlert={mostrarAlerta} cerrarAlert={() => setMostrarAlerta(false)} variant={tipoAlerta} msgAlert={mensajeAlerta}/>
    
    
    </>
  );

    



}