import { useApp } from "../context/useApp";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
const { setCategoriaSeleccionada, setisCarroOpen, setIsLoginOpen, totalUnidades, currentUser, logout, categorias } = useApp();  const navigate = useNavigate();

  const filtrar = (categoria) => {
    if (setCategoriaSeleccionada) {
      setCategoriaSeleccionada(categoria);
    }
    navigate("/#catalogo");
  };

  const irInicio = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="header sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={irInicio}>
            <img
              src="/img/logo.png"
              alt="Logo Pastelería Mil Sabores"
              className="img-fluid"
            />
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item nav-home">
                <Link className="nav-link" aria-current="page" to="/" onClick={irInicio}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#nosotros">Sobre Nosotros</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Nuestros Productos
                </a>
                <ul className="dropdown-menu">
                  {categorias.map((c) => (
                    <li key={c.id_categoria}>
                      <a
                        className="dropdown-item"
                        href="/#catalogo"
                        onClick={() => filtrar(c.nombre_categoria)}
                      >
                        {c.nombre_categoria}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <button
              type="button"
              className="carrito btn-nav position-relative"
              onClick={() => setisCarroOpen(true)}
              aria-label="Abrir carrito"
            >
              <i className="bi bi-cart"></i>
              {totalUnidades > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                  {totalUnidades}
                </span>
              )}
            </button>

            {currentUser ? (
  <div className="dropdown">
    <button
      type="button"
      className="btn-nav dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-label="Menú de usuario"
    >
      <i className="bi bi-person-check-fill"></i>
    </button>
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link className="dropdown-item" to="/perfil">
          <i className="bi bi-person me-2"></i>Mi perfil
        </Link>
      </li>
      {currentUser.isAdmin && (
        <li>
          <Link className="dropdown-item" to="/dashboard">
            <i className="bi bi-speedometer2 me-2"></i>Panel Admin
          </Link>
        </li>
      )}
      <li>
        <button type="button" className="dropdown-item" onClick={logout}>
          <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
        </button>
      </li>
    </ul>
  </div>
) : (
  <button
    type="button"
    className="btn-nav"
    onClick={() => setIsLoginOpen && setIsLoginOpen(true)}
    aria-label="Iniciar sesión"
  >
    <i className="bi bi-person"></i>
  </button>
)}
          </div>
        </div>
      </nav>
    </header>
  );
}