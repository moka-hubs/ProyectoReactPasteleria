import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import App_alert from "../components/alerts/alerts";

export default function Perfil() {
  const {
    currentUser,
    authLoading,
    perfilError,
    actualizarPerfil,
    setIsLoginOpen,
  } = useApp();

  const [form, setForm] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    fechaNacUsuario: "",
  });
  const [guardando, setGuardando] = useState(false);
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: "",
    variante: "success",
  });

  useEffect(() => {
    if (currentUser) {
      setForm({
        nombreUsuario: currentUser.nombreUsuario || "",
        apellidoUsuario: currentUser.apellidoUsuario || "",
        fechaNacUsuario: currentUser.fechaNacUsuario || "",
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (!authLoading && !currentUser) setIsLoginOpen?.(true);
  }, [authLoading, currentUser, setIsLoginOpen]);

  useEffect(() => {
    if (perfilError) {
      setAlerta({ mostrar: true, mensaje: perfilError, variante: "danger" });
    }
  }, [perfilError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setAlerta((prev) => ({ ...prev, mostrar: false }));

    const res = await actualizarPerfil(form);

    setGuardando(false);
    if (res.success) {
      setAlerta({
        mostrar: true,
        mensaje: "Datos actualizados correctamente",
        variante: "success",
      });
    } else {
      setAlerta({
        mostrar: true,
        mensaje: res.message || "No se pudo guardar el perfil",
        variante: "danger",
      });
    }
  };

  const cancelar = () => {
    setForm({
      nombreUsuario: currentUser?.nombreUsuario || "",
      apellidoUsuario: currentUser?.apellidoUsuario || "",
      fechaNacUsuario: currentUser?.fechaNacUsuario || "",
    });
    setAlerta((prev) => ({ ...prev, mostrar: false }));
  };

  if (authLoading) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-muted mt-3">Cargando perfil...</p>
      </main>
    );
  }

  if (!currentUser) return <Navigate to="/" replace />;

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h1 className="h4 mb-1">
                <i className="bi bi-person-circle me-2"></i>Mi perfil
              </h1>
              <small className="text-muted">Administra tus datos personales</small>
            </div>

            <div className="card-body p-4">
              <App_alert
                mostrarAlert={alerta.mostrar}
                cerrarAlert={() => setAlerta((prev) => ({ ...prev, mostrar: false }))}
                variant={alerta.variante}
                msgAlert={alerta.mensaje}
              />

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombreUsuario" className="form-label fw-semibold">
                      Nombre
                    </label>
                    <input
                      id="nombreUsuario"
                      name="nombreUsuario"
                      type="text"
                      className="form-control"
                      value={form.nombreUsuario}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={50}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="apellidoUsuario" className="form-label fw-semibold">
                      Apellido
                    </label>
                    <input
                      id="apellidoUsuario"
                      name="apellidoUsuario"
                      type="text"
                      className="form-control"
                      value={form.apellidoUsuario}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={50}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="correoUsuario" className="form-label fw-semibold">
                      Correo electrónico
                    </label>
                    <input
                      id="correoUsuario"
                      type="email"
                      className="form-control"
                      value={currentUser.correoUsuario || ""}
                      readOnly
                    />
                    <div className="form-text">El correo no se puede modificar.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="fechaNacUsuario" className="form-label fw-semibold">
                      Fecha de nacimiento
                    </label>
                    <input
                      id="fechaNacUsuario"
                      name="fechaNacUsuario"
                      type="date"
                      className="form-control"
                      value={form.fechaNacUsuario}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cuponBienvenida" className="form-label fw-semibold">
                      Cupón de bienvenida
                    </label>
                    <input
                      id="cuponBienvenida"
                      type="text"
                      className="form-control"
                      value={currentUser.cuponBienvenida || "Sin cupón"}
                      readOnly
                    />
                    <div className="form-text">Se asigna al registrarte.</div>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn-oferta" disabled={guardando}>
                    {guardando ? "Guardando..." : "Guardar cambios"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={cancelar}
                    disabled={guardando}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer bg-white text-muted small">
              ID de usuario: #{currentUser.id}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}