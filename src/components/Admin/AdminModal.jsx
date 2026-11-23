export default function AdminModal({
  titulo,
  onClose,
  onSubmit,
  children,
  textoBoton = "Guardar",
  guardando = false,
}) {
  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      ></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1055 }}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content shadow">
            <form onSubmit={onSubmit}>
              <div className="modal-header">
                <h2 className="modal-title fs-5">{titulo}</h2>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body p-4">{children}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-oferta"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-oferta" disabled={guardando}>
                  {guardando ? "Guardando..." : textoBoton}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
