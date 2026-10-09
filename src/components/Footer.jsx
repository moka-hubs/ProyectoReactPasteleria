export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="footer-logo">
            <img
              src="img/logo-void.png"
              alt="Logo Pastelería Mil Sabores"
              className="img-fluid"
              style={{ maxHeight: "150px" }}
            />
          </div>
          <div className="footer-content-direccion">
            <h5>Nuestras Sucursales</h5>
            <li>
              <p>Enrique Olivares 522,Santiago, La Florida</p>
            </li>
            <li>
              <p>Avenida Nueva Providencia 1953, Santiago, Providencia</p>
            </li>
          </div>

          <div className="footer-content-contacto">
            <h5>Contacto</h5>
            <p>
              <i className="bi bi-envelope"></i>
              contacto@milsabores.com
            </p>
            <p>
              <i className="bi bi-telephone"></i>
              +569 1234 5678
            </p>
            <p>
              <i className="bi bi-whatsapp"></i>
              +569 1234 5678
            </p>
          </div>

          <div className="footer-content-siguenos">
            <h5>Siguenos</h5>
            <p>
              <i className="bi bi-instagram"></i>
              MilSabores
            </p>
          </div>

          <div className="footer-map">

            <a
              href="https://maps.google.com/?q=Enrique+Olivares+522+La+Florida"
              target="_blank"
              rel="noopener noreferrer"
              className="d-block position-relative overflow-hidden rounded shadow-sm text-decoration-none"
              style={{ height: "180px", width: "100%" }}
            >
              <img
                src="img/mapa.png"
                alt="Mapa de ubicación Pastelería Mil Sabores"
                className="w-100 h-100"
                style={{ objectFit: "cover", top: "10px",left: "0"}}
              />
              <div
                className="position-absolute translate-middle"
                style={{ top: "55%", left: "50%" }}
              >
                <i className="bi bi-geo-alt-fill text-danger fs-2 filter-drop-shadow"></i>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white text-center py-1 small">
                <i className="bi bi-box-arrow-up-right me-1"></i> Abrir en
                Google Maps
              </div>
            </a>
          </div>

          <div className="footer-derechos text-center">
            <p>© 2026 Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </>
  );
}
