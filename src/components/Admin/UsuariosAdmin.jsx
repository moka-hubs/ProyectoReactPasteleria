import { useCallback, useEffect, useState } from "react";
import { useApp } from "../../context/useApp";
import {
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarios,
} from "../../api/usuariosApi";
import AdminModal from "./AdminModal";
import ConfirmarEliminacion from "./ConfirmarEliminacion";
import App_alert from "../alerts/alerts";
import { fechaParaInput } from "../../utils/formato";

const FORMULARIO_VACIO = {
  nombreUsuario: "",
  apellidoUsuario: "",
  correoUsuario: "",
  contraseniaUsuario: "",
  fechaNacUsuario: "",
  rol: "CLIENTE",
  cuponBienvenida: "",
};

export default function UsuariosAdmin() {
  const { currentUser } = useApp();

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [guardando, setGuardando] = useState(false);
  const [confirmar, setConfirmar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [alerta, setAlerta] = useState({ mostrar: false, variante: "success", mensaje: "" });

  const mostrarAlerta = (mensaje, variante = "success") =>
    setAlerta({ mostrar: true, variante, mensaje });

  const cargarUsuarios = useCallback(async () => {
    setCargando(true);
    try {
      const datos = await obtenerUsuarios();
      setUsuarios(Array.isArray(datos) ? datos : []);
    } catch (error) {
      setAlerta({
        mostrar: true,
        variante: "danger",
        mensaje: error.message || "No se pudieron cargar los usuarios.",
      });
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await cargarUsuarios();
    })();
  }, [cargarUsuarios]);

  const abrirNuevo = () => {
    setUsuarioEditando(null);
    setFormulario(FORMULARIO_VACIO);
    setModalAbierto(true);
  };

  const abrirEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setFormulario({
      nombreUsuario: usuario.nombreUsuario || "",
      apellidoUsuario: usuario.apellidoUsuario || "",
      correoUsuario: usuario.correoUsuario || "",
      contraseniaUsuario: "",
      fechaNacUsuario: fechaParaInput(usuario.fechaNacUsuario),
      rol: usuario.rol || "CLIENTE",
      cuponBienvenida: usuario.cuponBienvenida || "",
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioEditando(null);
    setFormulario(FORMULARIO_VACIO);
  };

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const guardar = async (evento) => {
    evento.preventDefault();
    if (!usuarioEditando && !formulario.contraseniaUsuario) {
      mostrarAlerta("La contraseña es obligatoria para crear un usuario.", "danger");
      return;
    }

    setGuardando(true);
    try {
      const datos = {
        nombreUsuario: formulario.nombreUsuario.trim(),
        apellidoUsuario: formulario.apellidoUsuario.trim(),
        correoUsuario: formulario.correoUsuario.trim(),
        fechaNacUsuario: formulario.fechaNacUsuario,
        cuponBienvenida: formulario.cuponBienvenida.trim() || null,
      };
      if (!usuarioEditando) {
        datos.contraseniaUsuario = formulario.contraseniaUsuario;
        datos.rol = formulario.rol;
        await agregarUsuario(datos);
      } else {
        if (formulario.contraseniaUsuario) {
          datos.contraseniaUsuario = formulario.contraseniaUsuario;
        }
        await actualizarUsuario(usuarioEditando.id, datos);
      }
      await cargarUsuarios();
      cerrarModal();
      mostrarAlerta(
        usuarioEditando ? "Usuario actualizado correctamente." : "Usuario creado correctamente.",
      );
    } catch (error) {
      mostrarAlerta(error.message || "No se pudo guardar el usuario.", "danger");
    } finally {
      setGuardando(false);
    }
  };

  const borrar = async () => {
    if (!confirmar) return;
    if (confirmar.id === currentUser?.id) {
      mostrarAlerta("No puedes eliminar tu propia cuenta.", "danger");
      setConfirmar(null);
      return;
    }
    setEliminando(true);
    try {
      await eliminarUsuario(confirmar.id);
      await cargarUsuarios();
      mostrarAlerta(`Se eliminó a ${confirmar.nombreUsuario} ${confirmar.apellidoUsuario}.`);
    } catch (error) {
      mostrarAlerta(error.message || "No se pudo eliminar el usuario.", "danger");
    } finally {
      setConfirmar(null);
      setEliminando(false);
    }
  };

  const texto = filtro.trim().toLowerCase();
  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nombreUsuario?.toLowerCase().includes(texto) ||
      usuario.apellidoUsuario?.toLowerCase().includes(texto) ||
      usuario.correoUsuario?.toLowerCase().includes(texto),
  );

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="fs-4 mb-1" style={{ color: "#5d4037" }}>Usuarios</h2>
          <span className="text-muted small">{usuarios.length} usuarios registrados</span>
        </div>
        <button type="button" className="btn-oferta" onClick={abrirNuevo}>
          <i className="bi bi-plus-circle me-1"></i>Nuevo usuario
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
          placeholder="Buscar por nombre o correo"
          value={filtro}
          onChange={(evento) => setFiltro(evento.target.value)}
          aria-label="Buscar usuarios"
        />
      </div>

      <div className="table-responsive border rounded bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: "70px" }}>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">Cargando usuarios...</td>
              </tr>
            )}
            {!cargando && usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">No hay usuarios para mostrar.</td>
              </tr>
            )}
            {!cargando &&
              usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="fw-semibold">{usuario.id}</td>
                  <td>{usuario.nombreUsuario} {usuario.apellidoUsuario}</td>
                  <td>{usuario.correoUsuario}</td>
                  <td>
                    <span className={`badge ${usuario.rol === "ADMIN" ? "bg-danger" : "bg-secondary"}`}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td className="text-end text-nowrap">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => abrirEditar(usuario)}
                      aria-label={`Editar ${usuario.nombreUsuario}`}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setConfirmar(usuario)}
                      aria-label={`Eliminar ${usuario.nombreUsuario}`}
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
          titulo={usuarioEditando ? "Editar usuario" : "Nuevo usuario"}
          onClose={cerrarModal}
          onSubmit={guardar}
          guardando={guardando}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="usrNombre" className="form-label fw-semibold">Nombre</label>
              <input
                id="usrNombre"
                name="nombreUsuario"
                className="form-control"
                value={formulario.nombreUsuario}
                onChange={cambiarCampo}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="usrApellido" className="form-label fw-semibold">Apellido</label>
              <input
                id="usrApellido"
                name="apellidoUsuario"
                className="form-control"
                value={formulario.apellidoUsuario}
                onChange={cambiarCampo}
                required
              />
            </div>
            <div className="col-md-8">
              <label htmlFor="usrCorreo" className="form-label fw-semibold">Correo electrónico</label>
              <input
                id="usrCorreo"
                name="correoUsuario"
                type="email"
                className="form-control"
                value={formulario.correoUsuario}
                onChange={cambiarCampo}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="usrRol" className="form-label fw-semibold">Rol</label>
              <select
                id="usrRol"
                name="rol"
                className="form-select"
                value={formulario.rol}
                onChange={cambiarCampo}
                disabled={Boolean(usuarioEditando)}
              >
                <option value="CLIENTE">CLIENTE</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              {usuarioEditando && <div className="form-text">El rol no se modifica en la edición.</div>}
            </div>
            <div className="col-md-6">
              <label htmlFor="usrPassword" className="form-label fw-semibold">
                Contraseña {usuarioEditando && <span className="fw-normal text-muted">(dejar vacía para mantener)</span>}
              </label>
              <input
                id="usrPassword"
                name="contraseniaUsuario"
                type="password"
                className="form-control"
                value={formulario.contraseniaUsuario}
                onChange={cambiarCampo}
                minLength="6"
                required={!usuarioEditando}
                autoComplete="new-password"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="usrFecha" className="form-label fw-semibold">Fecha de nacimiento</label>
              <input
                id="usrFecha"
                name="fechaNacUsuario"
                type="date"
                className="form-control"
                value={formulario.fechaNacUsuario}
                onChange={cambiarCampo}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="usrCupon" className="form-label fw-semibold">Cupón de bienvenida (opcional)</label>
              <input
                id="usrCupon"
                name="cuponBienvenida"
                className="form-control"
                maxLength="20"
                value={formulario.cuponBienvenida}
                onChange={cambiarCampo}
                placeholder="Ej.: FELICES50"
              />
            </div>
          </div>
        </AdminModal>
      )}

      {confirmar && (
        <ConfirmarEliminacion
          titulo="Eliminar usuario"
          detalle={`¿Estás seguro de eliminar a ${confirmar.nombreUsuario} ${confirmar.apellidoUsuario}?`}
          onCancelar={() => setConfirmar(null)}
          onConfirmar={borrar}
          eliminando={eliminando}
        />
      )}
    </section>
  );
}
