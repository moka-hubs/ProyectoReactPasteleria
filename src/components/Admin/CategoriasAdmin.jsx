import { useState } from "react";
import { useApp } from "../../context/useApp";
import {
  agregarCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../../api/categoriaApi";
import AdminModal from "./AdminModal";
import ConfirmarEliminacion from "./ConfirmarEliminacion";
import App_alert from "../alerts/alerts";

export default function CategoriasAdmin() {
  const { categorias, recargarCategorias } = useApp();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [nombre, setNombre] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [confirmar, setConfirmar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [alerta, setAlerta] = useState({ mostrar: false, variante: "success", mensaje: "" });

  const mostrarAlerta = (mensaje, variante = "success") =>
    setAlerta({ mostrar: true, variante, mensaje });

  const abrirNuevo = () => {
    setCategoriaEditando(null);
    setNombre("");
    setModalAbierto(true);
  };

  const abrirEditar = (categoria) => {
    setCategoriaEditando(categoria);
    setNombre(categoria.nombre_categoria);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCategoriaEditando(null);
    setNombre("");
  };

  const guardar = async (evento) => {
    evento.preventDefault();
    const valor = nombre.trim();
    if (valor.length < 3 || valor.length > 50) {
      mostrarAlerta("El nombre debe tener entre 3 y 50 caracteres.", "danger");
      return;
    }

    setGuardando(true);
    try {
      if (categoriaEditando) {
        await actualizarCategoria(categoriaEditando.id_categoria, { nombre_categoria: valor });
      } else {
        await agregarCategoria({ nombre_categoria: valor });
      }
      await recargarCategorias();
      cerrarModal();
      mostrarAlerta(
        categoriaEditando ? "Categoría actualizada correctamente." : "Categoría creada correctamente.",
      );
    } catch (error) {
      mostrarAlerta(error.message || "No se pudo guardar la categoría.", "danger");
    } finally {
      setGuardando(false);
    }
  };

  const borrar = async () => {
    if (!confirmar) return;
    setEliminando(true);
    try {
      await eliminarCategoria(confirmar.id_categoria);
      await recargarCategorias();
      mostrarAlerta(`Se eliminó la categoría ${confirmar.nombre_categoria}.`);
    } catch (error) {
      mostrarAlerta(error.message || "No se pudo eliminar la categoría.", "danger");
    } finally {
      setConfirmar(null);
      setEliminando(false);
    }
  };

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="fs-4 mb-1" style={{ color: "#5d4037" }}>Categorías</h2>
          <span className="text-muted small">{categorias.length} categorías</span>
        </div>
        <button type="button" className="btn-oferta" onClick={abrirNuevo}>
          <i className="bi bi-plus-circle me-1"></i>Nueva categoría
        </button>
      </div>

      <App_alert
        mostrarAlert={alerta.mostrar}
        cerrarAlert={() => setAlerta((a) => ({ ...a, mostrar: false }))}
        variant={alerta.variante}
        msgAlert={alerta.mensaje}
      />

      <div className="table-responsive border rounded bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: "120px" }}>ID</th>
              <th>Nombre</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id_categoria}>
                <td className="fw-semibold">{categoria.id_categoria}</td>
                <td>{categoria.nombre_categoria}</td>
                <td className="text-end text-nowrap">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={() => abrirEditar(categoria)}
                    aria-label={`Editar ${categoria.nombre_categoria}`}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setConfirmar(categoria)}
                    aria-label={`Eliminar ${categoria.nombre_categoria}`}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAbierto && (
        <AdminModal
          titulo={categoriaEditando ? "Editar categoría" : "Nueva categoría"}
          onClose={cerrarModal}
          onSubmit={guardar}
          guardando={guardando}
        >
          <div className="mb-0">
            <label htmlFor="catNombre" className="form-label fw-semibold">Nombre de la categoría</label>
            <input
              id="catNombre"
              className="form-control"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              placeholder="Ej.: Tortas Especiales"
              required
            />
            <div className="form-text">Entre 3 y 50 caracteres.</div>
          </div>
        </AdminModal>
      )}

      {confirmar && (
        <ConfirmarEliminacion
          titulo="Eliminar categoría"
          detalle={`¿Estás seguro de eliminar "${confirmar.nombre_categoria}"?`}
          onCancelar={() => setConfirmar(null)}
          onConfirmar={borrar}
          eliminando={eliminando}
        />
      )}
    </section>
  );
}
