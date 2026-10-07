
import { useApp } from "../../context/Contexto";



export const ModalAgregado = () => {
  const { ModalAgregadoInfo, setModalAgregado, setisCarroOpen } = useApp();

  if (!ModalAgregadoInfo.isOpen) return null;

  const handleClose = () => {
    setModalAgregado({ isOpen: false, productoNombre: "" });
  };

  const handleVerCarrito = () => {
    handleClose();
    setisCarroOpen(true);
  };

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1060 }}
        onClick={handleClose}
      ></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1065 }}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow border-0">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title fs-5">
                <i className="bi bi-check-circle-fill me-2"></i>
                Producto Agregado
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleClose}
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body text-center p-4">
              <p className="fs-5 mb-0 text-dark">
               {`"${ModalAgregadoInfo.productoNombre}" se agregó al carrito exitosamente.`}
              </p>
            </div>

            <div className="modal-footer justify-content-center border-0 pb-4">
              <button
                type="button"
                className="btn btn-secondary px-4 py-2"
                onClick={handleClose}
              >
                Seguir Comprando
              </button>
              <button
                type="button"
                className="btn btn-success px-4 py-2"
                onClick={handleVerCarrito}
              >
                <i className="bi bi-cart3 me-1"></i>
                Ver Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};