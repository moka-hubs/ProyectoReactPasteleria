import { useApp } from "../context/Contexto";
import { useParams, useNavigate } from "react-router-dom";
import CardProducto from "../components/CardProducto";

export default function DetalleProducto() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const { productos, agregarAlCarrito } = useApp();

  const producto = productos.find((p) => p.codigo === codigo);

  if (!producto) {
    return (
      <>
        <div className="container text-center py-5 my-5">
          <h2 className="mb-3">Producto no encontrado</h2>
          <button
            className="btn btn-primary mb-5"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </div>
      </>
    );
  }

  const productosSugeridos = productos
    .filter(
      (p) => p.categoria === producto.categoria && p.codigo !== producto.codigo,
    )
    .slice(0, 5);

  return (
    <>
      <div className="container my-5">

        <div className="row g-5 align-items-center bg-white p-4 p-md-5 shadow-sm container-detalle">
          <div className="col-12 col-md-6 text-center">
            <img
              src={`/img/${producto.imagen}`}
              alt={producto.nombre}
              className="img-fluid rounded-4 shadow-sm"
              style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-12 col-md-6">
            <span className="badge bg-success text-dark mb-2 px-3 py-2 fs-6">
              {producto.categoria}
            </span>
            <h1 className="fw-bold display-6 mb-3">{producto.nombre}</h1>
            <h2 className="text-success fw-bold mb-3">
              ${producto.precio?.toLocaleString("es-CL")} CLP
            </h2>
            <p className="lead text-muted mb-4">{producto.descripcion}</p>
            <div className="mb-4">

              <span className="text-muted ms-3 small">
                Código: {producto.codigo}
              </span>

              <div className="d-grid gap-2">
                <button
                  className=" py-3 fw-bold shadow-sm   btn-oferta"
                  onClick={() => agregarAlCarrito(producto.codigo)}
                  disabled={producto.stock <= 0}
                >
                  Agregar al Carro
                </button>
              </div>
            </div>
          </div>
        </div>

        {productosSugeridos.length > 0 && (
          <section className="mt-5 pt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold m-0">Productos Sugeridos</h3>
            </div>
            <div className="row">
              {productosSugeridos.map((sugerido) => (
                <CardProducto key={sugerido.codigo} producto={sugerido} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
