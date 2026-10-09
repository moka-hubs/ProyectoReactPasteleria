import { useApp } from "../context/Contexto";
import { useState } from "react";
import App_alert from "./alerts/alerts";

export const CarritoOffcanvas = () => {

  
    const [tipoAlerta, setTipoAlerta] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState("");

  const {
    carrito,
    isCarroOpen,
    setisCarroOpen,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    totalCarrito
  } = useApp();

  const handleFinalizarCompra = () => {
    if (carrito.length === 0) {
      setMensajeAlerta("Tu carrito esta vacío");
      setTipoAlerta("danger");
      setMostrarAlerta(true);
      
      return;
    }
    setMensajeAlerta("¡Muchas gracias por tu compra en Pastelería Mil Sabores! En breve nos pondremos en contacto.")
    setTipoAlerta("success")
    setMostrarAlerta(true);
    setTimeout(() => {
      vaciarCarrito();
      setisCarroOpen(false);
      setMostrarAlerta(false);
      setMensajeAlerta("");
    }, 2000);
  };

  return (
    <>
      {isCarroOpen && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setisCarroOpen(false)}
          style={{ zIndex: 1040 }}
        ></div>
      )}

      <div
        className={`offcanvas offcanvas-end ${isCarroOpen ? "show" : ""}`}
        tabIndex="-1"
        style={{
          //visibility: isCarroOpen ? "visible" : "hidden",
          zIndex: 1045,
          backgroundColor: "#fcf8f7"
        }}
        aria-labelledby="carritoOffcanvasLabel"
      >
        <div className="offcanvas-header border-bottom" style={{ backgroundColor: "#ffc0cb" }}>
          <h3 className="offcanvas-title fs-4" id="carritoOffcanvasLabel" style={{ color: "#5d4037", margin: 0 }}>
            Tu Carrito
          </h3>
          <button
            type="button"
            className="btn-close"
            onClick={() => setisCarroOpen(false)}
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column justify-content-between p-3">
          <App_alert mostrarAlert={mostrarAlerta} cerrarAlert={() => setMostrarAlerta(false)} variant={tipoAlerta} msgAlert={mensajeAlerta}/>
          <div id="items-carrito" className="overflow-auto flex-grow-1 pe-1">
            {carrito.length === 0 ? (
              <div className="text-center my-5">
                <i className="bi bi-cart-x text-muted" style={{ fontSize: "3rem" }}></i>
                <p className="text-muted mt-2">El carrito está vacío.</p>
              </div>
            ) : (
              carrito.map((item) => (
                <div
                  key={item.codigo}
                  className="d-flex align-items-center border-bottom py-3"
                >
                  <img
                    src={`/img/${item.imagen}`}
                    alt={item.nombre}
                    style={{ width: "55px", height: "55px", objectFit: "cover" }}
                    className="me-3 rounded shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/img/logo.png";
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0 fw-semibold text-dark">{item.nombre}</h6>
                    <small className="text-muted">
                      ${item.precio.toLocaleString("es-CL")} CLP
                    </small>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary px-2 py-0"
                      onClick={() => cambiarCantidad(item.codigo, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2 fw-bold">{item.cantidad}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary px-2 py-0"
                      onClick={() => cambiarCantidad(item.codigo, 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => eliminarDelCarrito(item.codigo)}
                      title="Eliminar producto"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-top pt-3 mt-2">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <strong className="fs-5">Total:</strong>
              <span id="total-carrito" className="fs-5 fw-bold text-success">
                ${totalCarrito.toLocaleString("es-CL")} CLP
              </span>
            </div>
            <button
              id="btn-vaciar"
              className="btn btn-outline-danger w-100 mb-2"
              onClick={vaciarCarrito}
              disabled={carrito.length === 0}
            >
              <i className="bi bi-trash3 me-1"></i>
              Vaciar Carrito
            </button>
            <button
              className="btn btn-success w-100 py-2 fw-semibold"
              onClick={handleFinalizarCompra}
              disabled={carrito.length === 0}
            >
              <i className="bi bi-credit-card me-1"></i>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </>
  );
};