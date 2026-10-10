import { useState } from "react";
import { useApp } from "../../context/Contexto"
import App_alert from "../alerts/alerts";


export const ModalRegistro = () => {

    const {isRegistroOpen, setIsRegistroOpen, register, setIsLoginOpen} = useApp();

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

    if (!isRegistroOpen) {
        return null;
        
    }

    const finalizarRegistro = () => {
        setMostrarAlerta(false);
        setMensajeAlerta("");
        setIsRegistroOpen(false);
        setIsLoginOpen(false);
    };

    const handleClose = () => {
        finalizarRegistro();
    };

    const cerrarAlerta = () => {
        setMostrarAlerta(false);
    };

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

    const nuevoUsuario = {
      nombre,
      apellido,
      correo,
      email: correo,
      password,
      tieneDescuento: cupon.trim() === cuponValido,
      fechaNacimiento: fecha
    };


    const res = register(nuevoUsuario);
    if (res.success) {
      setMensajeAlerta("Registro Exitoso , ya puedes ingresar a tu cuenta.")
      setTipoAlerta("success");
      setMostrarAlerta(true);
      setFormData({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        fecha: "",
        cupon: ""
      });
      setTimeout(finalizarRegistro, 1500);
    } else {
      setMensajeAlerta(res.message)
      setTipoAlerta("danger");
      setMostrarAlerta(true);
    }
  };





  return(
    <>
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
              <h1 className="modal-title fs-5">Crea tu cuenta</h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body p-4">
              <App_alert mostrarAlert={mostrarAlerta} cerrarAlert={cerrarAlerta} variant={tipoAlerta} msgAlert={mensajeAlerta}/>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ingrese su nombre aquí..."
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    className="form-control"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Ingrese su apellido aquí..."
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Correo electrónico</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Al menos 6 caracteres, letras y números"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="fecha"
                    className="form-control"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Cupón de Bienvenida</label>
                  <input
                    type="text"
                    name="cupon"
                    className="form-control"
                    value={formData.cupon}
                    onChange={handleChange}
                    placeholder="Opcional (Ej: FELICES50)"
                  />
                </div>

                <div className="text-center mt-3">
                  <button type="submit" className="btn-oferta">
                    Registrarse
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