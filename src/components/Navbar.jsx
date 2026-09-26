

export default function NavBar(){

    return (
    <>
    <header className="header sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="index.html"><img
            src="img/logo.png"
            alt="Logo Pastelería Mil Sabores"
            className="img-fluid"
          /></a>
          
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
              <li className="nav-home">
                <a className="nav-link active" aria-current="page" href="index.html"
                  >Home</a
                >
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#nosotros">Sobre Nosotros </a>
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
                  <li>
                    <a className="dropdown-item" href="#catalogo" onClick="filtrar('Todos Los Productos')"> Todos Los Productos</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#catalogo" onClick="filtrar('Productos Sin Azúcar')">Productos Sin Azúcar</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#catalogo" onClick="filtrar('Tortas Cuadradas')">Tortas Cuadradas</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#catalogo"  onClick="filtrar('Tortas Circulares')">Tortas Circulares</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#catalogo"  onClick="filtrar('Postres Individuales')">Postres Individuales </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#catalogo"  onClick="filtrar('Pastelería Tradicional')">Pasteleria Tradicional</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#catalogo"  onClick="filtrar('Productos Sin Gluten')">Productos Sin Gluten</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#catalogo"  onClick="filtrar('Productos Veganos')">Productos Veganos</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#catalogo" onClick="filtrar('Tortas Especiales')">Tortas Especiales</a>
                  </li>
                  <li>
                    <a  className= "dropdown-item" href="#catalogo"onClick="filtrar('Más Vendidos')">Productos Más Vendidos</a>
                  </li>
                </ul>
              </li>
            </ul>
              <button
                type="button"
                className="carrito btn-nav position-relative"
                data-bs-toggle="offcanvas"
                data-bs-target="#carritoOffcanvas"
                aria-controls="carritoOffcanvas"
              >
                <i className="bi bi-cart"></i>
                
              </button>
              <button
                type="button"
                className="btn-nav"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                <i className="bi bi-person"></i>
              </button>
          </div>
        </div>
      </nav>
    </header>
      
    </>
    );
    };