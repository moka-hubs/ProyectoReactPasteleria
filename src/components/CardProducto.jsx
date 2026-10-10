import React from "react";
import { useApp } from "../context/Contexto";
import { Link } from "react-router-dom";

export default function Productos({ producto }) {
  const { agregarAlCarrito } = useApp();

  if (!producto) {
    return null;
  }

  return (
    <div className="col-12 col-sm-6 col-md-3 mb-4 d-flex">
      <div className="cardPasteleria d-flex flex-column h-100 w-100 m-0 p-3">
        <Link to={`/producto/${producto.codigo}`} className="text-center d-block">
          <img
            src={`/img/${producto.imagen}`}
            alt={producto.nombre}
            className="img-fluid rounded mb-3"
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          />
        </Link>

        <div
          style={{ minHeight: "75px" }}
          className="d-flex align-items-center justify-content-center text-center mb-2"
        >
          <h3 className="titulo-card fs-4 fw-bold m-0">{producto.nombre}</h3>
        </div>

        <p className="precio-card fw-bold text-center text-success mb-3">
          ${producto.precio?.toLocaleString("es-CL")} CLP
        </p>

        <div className="mt-auto d-flex flex-column gap-2 pt-2">
          <button
            className="btn btn-custom btn-agregar m-0 w-70"
            onClick={() => agregarAlCarrito(producto.codigo)}
          >
            Agregar al carro
          </button>
          <Link
            to={`/producto/${producto.codigo}`}
            className="btn btn-custom btn-agregar m-0 w-70 text-center text-decoration-none d-flex align-items-center justify-content-center"
          >
            <i className="bi bi-eye me-1"></i> Ver producto
          </Link>
        </div>
      </div>
    </div>
  );
}
