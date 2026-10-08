import { useState } from "react";
import { useApp } from "../../context/Contexto";
import App_alert from "../alerts/alerts";

export default function ModalLogin(){
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const {
        isLoginOpen,
        setIsLoginOpen,
        setIsRegistroOpen,
        setisRecuperarOpen,
        login,
    } = useApp();

    if (!isLoginOpen) {
        return null
    }

    const handleClose = () => {
        setIsLoginOpen(false);
        setCorreo("");
        setPassword("");
        setMostrarAlerta(false);
        setMensajeAlerta("");
    };

    const irARegistro = () => {
        handleClose();
        setIsRegistroOpen(true);
    };

    const irARecuperar = () => {
        handleClose();
        setisRecuperarOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!correo.trim() || !password) {
            setMensajeAlerta("debes ingresar tu correo y tu contraseña")
            setMostrarAlerta(true);
            return
        }

        const resultado = login(correo.trim(), password);

        if(!resultado.success) {
            setMensajeAlerta(resultado.message);
            setMostrarAlerta(true);
            return;
        }

        handleClose();
    };

    return (
        <>
            <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1050}}
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
                            <h5 className="modal-title fs-4">Iniciar Sesion</h5>
                            <button 
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                                aria-label="Cerrar"
                            ></button>
                        </div>

                        <div className="modal-body p-4">
                            <App_alert
                                mostrarAlert={mostrarAlerta}
                                cerrarAlert={() => setMostrarAlerta(false)}
                                variant="danger"
                                msgAlert={mensajeAlerta}
                            />

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="loginCorreo" className="form-label fw-semibold">Correo electronico</label>
                                    <input
                                    type="email"
                                    id="loginCorreo"
                                    className="form-control"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    autoComplete="email"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="loginPassword" className="form-label fw-semibold">Contraseña</label>
                                    <input
                                    type="password"
                                    id="loginPassword"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    />
                                </div>

                                <button type="submit" className="btn btn-custom w-100 py-2 mb-3">Ingresar</button>

                                <div className="d-flex justify-content between small">
                                    <button
                                    type="button"
                                    className="btn btn-link p-0"
                                    onClick={irARecuperar}
                                    >
                                        ¿Olvidate tu contraseña?
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        onClick={irARegistro}
                                    >
                                        Crear cuenta
                                    </button>
                                </div>

                                
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}