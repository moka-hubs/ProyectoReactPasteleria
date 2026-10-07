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
        <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={handleClose}
      ></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1055 }}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Recupera tu contraseña</h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Ingrese su correo electrónico"
                    required
                  />
                </div>

                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary w-100 py-2">
                    Recuperar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        
        
        
        
        
        
        </>



    );




}