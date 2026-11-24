import { useEffect, useState } from "react";
import { useApp } from "../../context/useApp";
import {
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../api/productosApi";
import { obtenerCostos } from "../../api/dashboardApi";
import AdminModal from "./AdminModal";
import ConfirmarEliminacion from "./ConfirmarEliminacion";
import App_alert from "../alerts/alerts";
import { urlImagen } from "../../utils/imagen";
import { formatoMoneda } from "../../utils/formato";

const FORMULARIO_VACIO = {
  codigo: "",
  nombre: "",
  categoria: "",
  imagen: "",
  precio: "",
  stock: "",
  costo: "",
  descripcion: "",
};

export default function ProductosAdmin() {
  const {
    productos,
    productosLoading,
    productosError,
    recargarProductos,
    categorias,
  } = useApp();

  // Los costos solo los entrega el backend a administradores (el catálogo público no los trae).
  const [costos, setCostos] = useState({});
  const cargarCostos = () =>
      obtenerCostos()
          .then((datos) => setCostos(datos || {}))
          .catch(() => {});

  useEffect(() => {
    cargarCostos();
  }, []);

  const [filtro, setFiltro] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [codigoOriginal, setCodigoOriginal] = useState(null);
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [guardando, setGuardando] = useState(false);
  const [confirmar, setConfirmar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [alerta, setAlerta] = useState({ mostrar: false, variante: "success", mensaje: "" });

  const mostrarAlerta = (mensaje, variante = "success") =>
      setAlerta({ mostrar: true, variante, mensaje });

  const abrirNuevo = () => {
    setCodigoOriginal(null);
    setFormulario({
      ...FORMULARIO_VACIO,
      categoria: categorias[0]?.nombre_categoria || "",
    });
    setModalAbierto(true);
  };

  const abrirEditar = (producto) => {
    setCodigoOriginal(producto.codigo);
    setFormulario({
      ...producto,
      precio: String(producto.precio),
      stock: String(producto.stock),
      costo: costos[producto.codigo] != null ? String(costos[producto.codigo]) : "",
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCodigoOriginal(null);
    setFormulario(FORMULARIO_VACIO);
  };

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const validar = () => {
    const codigo = formulario.codigo.trim();
    const nombre = formulario.nombre.trim();
    const descripcion = formulario.descripcion.trim();
    const precio = Number(formulario.precio);
    const stock = Number(formulario.stock);
    const costo = Number(formulario.costo);

    if (codigo.length < 3 || codigo.length > 6) return "El código debe tener entre 3 y 6 caracteres.";
    if (nombre.length < 5 || nombre.length > 50) return "El nombre debe tener entre 5 y 50 caracteres.";
    if (!formulario.categoria) return "Debes elegir una categoría.";
    if (!formulario.imagen.trim()) return "La imagen es obligatoria.";
    if (!Number.isInteger(precio) || precio < 1000 || precio > 1600000)
      return "El precio debe estar entre $1.000 y $1.600.000.";
    if (!Number.isInteger(stock) || stock < 0 || stock > 100)
      return "El stock debe estar entre 0 y 100.";
    if (formulario.costo !== "" && (!Number.isInteger(costo) || costo < 0 || costo > 1600000))
      return "El costo debe ser un número entero entre $0 y $1.600.000.";
    if (descripcion.length < 10 || descripcion.length > 500)
      return "La descripción debe tener entre 10 y 500 caracteres.";
    return null;
  };

  const guardar = async (evento) => {
    evento.preventDefault();
    const error = validar();
    if (error) {
      mostrarAlerta(error, "danger");
      return;
    }

    setGuardando(true);
    try {
      const datos = {
        ...formulario,
        codigo: (codigoOriginal || formulario.codigo).trim(),
        categoria: formulario.categoria.trim(),
        imagen: formulario.imagen.trim(),
        nombre: formulario.nombre.trim(),
        descripcion: formulario.descripcion.trim(),
        precio: Number(formulario.precio),
        stock: Number(formulario.stock),
        costo: formulario.costo === "" ? null : Number(formulario.costo),
      };

      if (codigoOriginal) {
        await actualizarProducto(codigoOriginal, datos);
      } else {
        await agregarProducto(datos);
      }
      await recargarProductos();
      cargarCostos();
      cerrarModal();
      mostrarAlerta(
          codigoOriginal ? "Producto actualizado correctamente." : "Producto creado correctamente.",
      );
    } catch (error) {
      mostrarAlerta(error.message || "No se pudo guardar el producto.", "danger");
    } finally {
      setGuardando(false);
    }
  };

  const borrar = async () => {
    if (!confirmar) return;
    setEliminando(true);
    try {
      await eliminarProducto(confirmar.codigo);
      await recargarProductos();
      mostrarAlerta(`Se eliminó ${confirmar.nombre}.`);
    } catch (error) {
      mostrarAlerta(error.message || "No se pudo eliminar el producto.", "danger");
    } finally {
      setConfirmar(null);
      setEliminando(false);
    }
  };

  const texto = filtro.trim().toLowerCase();
  const productosFiltrados = productos.filter(
      (producto) =>
          producto.codigo.toLowerCase().includes(texto) ||
          producto.nombre.toLowerCase().includes(texto) ||
          String(producto.categoria).toLowerCase().includes(texto),
  );

  return (
      <section>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div>
            <h2 className="fs-4 mb-1" style={{ color: "#5d4037" }}>Productos</h2>
            <span className="text-muted small">{productos.length} productos en el catálogo</span>
          </div>
          <button type="button" className="btn-oferta" onClick={abrirNuevo}>
            <i className="bi bi-plus-circle me-1"></i>Nuevo producto
          </button>
        </div>

        <App_alert
            mostrarAlert={alerta.mostrar}
            cerrarAlert={() => setAlerta((a) => ({ ...a, mostrar: false }))}
            variant={alerta.variante}
            msgAlert={alerta.mensaje}
        />

        <div className="mb-3" style={{ maxWidth: "360px" }}>
          <input
              type="search"
              className="form-control"
              placeholder="Buscar por código, nombre o categoría"
              value={filtro}
              onChange={(evento) => setFiltro(evento.target.value)}
              aria-label="Buscar productos"
          />
        </div>

        {productosError && (
            <p className="text-danger small">No se pudieron cargar los productos: {productosError}</p>
        )}

        <div className="table-responsive border rounded bg-white">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th className="text-end">Precio</th>
              <th className="text-end">Costo</th>
              <th className="text-end">Stock</th>
              <th className="text-end">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {productosLoading && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">Cargando productos...</td>
                </tr>
            )}
            {!productosLoading && productosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">No hay productos para mostrar.</td>
                </tr>
            )}
            {!productosLoading &&
                productosFiltrados.map((producto) => (
                    <tr key={producto.codigo}>
                      <td className="fw-semibold">{producto.codigo}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                              src={urlImagen(producto.imagen)}
                              alt=""
                              width="44"
                              height="44"
                              style={{ objectFit: "cover", borderRadius: "8px" }}
                          />
                          <span>{producto.nombre}</span>
                        </div>
                      </td>
                      <td>{producto.categoria}</td>
                      <td className="text-end">{formatoMoneda(producto.precio)}</td>
                      <td className="text-end">
                        {costos[producto.codigo] != null ? formatoMoneda(costos[producto.codigo]) : "—"}
                      </td>
                      <td className="text-end">
                    <span className={`badge ${producto.stock <= 3 ? "bg-warning text-dark" : "bg-success"}`}>
                      {producto.stock}
                    </span>
                      </td>
                      <td className="text-end text-nowrap">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => abrirEditar(producto)}
                            aria-label={`Editar ${producto.nombre}`}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setConfirmar(producto)}
                            aria-label={`Eliminar ${producto.nombre}`}
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
                titulo={codigoOriginal ? "Editar producto" : "Nuevo producto"}
                onClose={cerrarModal}
                onSubmit={guardar}
                guardando={guardando}
            >
              <div className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="prodCodigo" className="form-label fw-semibold">Código</label>
                  <input
                      id="prodCodigo"
                      name="codigo"
                      className="form-control"
                      value={formulario.codigo}
                      onChange={cambiarCampo}
                      disabled={Boolean(codigoOriginal)}
                      required
                  />
                  {codigoOriginal && <div className="form-text">El código no se puede cambiar.</div>}
                </div>
                <div className="col-md-8">
                  <label htmlFor="prodNombre" className="form-label fw-semibold">Nombre</label>
                  <input
                      id="prodNombre"
                      name="nombre"
                      className="form-control"
                      value={formulario.nombre}
                      onChange={cambiarCampo}
                      required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="prodCategoria" className="form-label fw-semibold">Categoría</label>
                  <select
                      id="prodCategoria"
                      name="categoria"
                      className="form-select"
                      value={formulario.categoria}
                      onChange={cambiarCampo}
                      required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id_categoria} value={categoria.nombre_categoria}>
                          {categoria.nombre_categoria}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="prodPrecio" className="form-label fw-semibold">Precio</label>
                  <input
                      id="prodPrecio"
                      name="precio"
                      type="number"
                      min="1000"
                      max="1600000"
                      className="form-control"
                      value={formulario.precio}
                      onChange={cambiarCampo}
                      required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="prodStock" className="form-label fw-semibold">Stock</label>
                  <input
                      id="prodStock"
                      name="stock"
                      type="number"
                      min="0"
                      max="100"
                      className="form-control"
                      value={formulario.stock}
                      onChange={cambiarCampo}
                      required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="prodCosto" className="form-label fw-semibold">Costo (opcional)</label>
                  <input
                      id="prodCosto"
                      name="costo"
                      type="number"
                      min="0"
                      max="1600000"
                      className="form-control"
                      placeholder="Costo de elaboración"
                      value={formulario.costo}
                      onChange={cambiarCampo}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="prodImagen" className="form-label fw-semibold">URL de la imagen</label>
                  <input
                      id="prodImagen"
                      name="imagen"
                      className="form-control"
                      placeholder="https://drive.google.com/uc?export=view&id=..."
                      value={formulario.imagen}
                      onChange={cambiarCampo}
                      required
                  />
                  {formulario.imagen && (
                      <img
                          src={urlImagen(formulario.imagen)}
                          alt="Vista previa"
                          className="mt-2 rounded"
                          style={{ width: "120px", height: "90px", objectFit: "cover" }}
                      />
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="prodDescripcion" className="form-label fw-semibold">Descripción</label>
                  <textarea
                      id="prodDescripcion"
                      name="descripcion"
                      rows="3"
                      className="form-control"
                      value={formulario.descripcion}
                      onChange={cambiarCampo}
                      required
                  />
                </div>
              </div>
            </AdminModal>
        )}

        {confirmar && (
            <ConfirmarEliminacion
                titulo="Eliminar producto"
                detalle={`¿Estás seguro de eliminar "${confirmar.nombre}" (${confirmar.codigo})?`}
                onCancelar={() => setConfirmar(null)}
                onConfirmar={borrar}
                eliminando={eliminando}
            />
        )}
      </section>
  );
}
