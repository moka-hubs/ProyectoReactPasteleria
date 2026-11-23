export default function ConfirmarEliminacion({ titulo, detalle, onCancelar, onConfirmar, eliminando = false }) {
  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }} onClick={onCancelar}></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1055 }}
        role="alertdialog"
        aria-modal="true"
        aria-label={titulo}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h2 className="modal-title fs-5">{titulo}</h2>
              <button type="button" className="btn-close" onClick={onCancelar} aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">{detalle}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={onConfirmar} disabled={eliminando}>
                {eliminando ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
