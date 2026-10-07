import { useState } from "react";
import { useApp } from "../../context/Contexto"
import App_alert from "./alerts/alerts";


export const RecuperarModal = () => {


    const [tipoAlerta, setTipoAlerta] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState("");

    const {isRecuperarOpen, setisRecuperarOpen , recuperarPassword} = useApp();
    const [correo,setCorreo] = useState("");

    if (!isRecuperarOpen) {
        return null
        
    }

    const rec = recuperarPassword(correo.trim());
    
    if (rec.success) {
        setMensajeAlerta(`¡Cuenta Encontrada! Tu contraseña es: ${rec.password}`)
        setTipoAlerta("success");
        setMostrarAlerta(true);
    }else {
      setMensajeAlerta(rec.mensaje)
      setTipoAlerta("danger");
      setMostrarAlerta(true);
    }

    const handleClose = () => {
        setisRecuperarOpen(false);
        setCorreo("");
        setMostrarAlerta(false);
        setMensajeAlerta("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!correo.trim()) {
          setMensajeAlerta("Por favor, ingrese un correo electronónico")
          setTipoAlerta("danger");
          setMostrarAlerta(true);
            
        }
    }

    return (
        <>
        <App_alert mostrarAlert={mostrarAlerta} cerrarAlert={() => setMostrarAlerta(false)} variant={tipoAlerta} msgAlert={mensajeAlerta}/>
        
        
        
        
        </>



    );




}