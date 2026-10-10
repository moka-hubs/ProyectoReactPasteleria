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
      <div className="cardPasteleria d-flex flex-column h-100">
        <Link to={`/producto/${producto.codigo}`}>
          <img
            src={`/img/${producto.imagen}`}
            alt={producto.nombre}
            className="img-fluid my-3 mt-2"
            style={{ maxHeight: "250px", objectFit: "cover" }}
          />
        </Link>
        <div
          style={{ minHeight: "60px" }}
          className="d-flex align-items-center justify-content-center text-center"
        >
          <h3 className="titulo-card fs-7 fw-bold m-0">{producto.nombre}</h3>
        </div>
        <p className="precio-card fw-bold text-center text-success my-2">
          ${producto.precio} CLP
        </p>


        <button
          className="btn btn-custom btn-agregar mt-auto w-100"
          onClick={() => agregarAlCarrito(producto.codigo)}
        >
          Agregar al carro
        </button>
        <div className="d-flex flex-column gap-1 mt-1">
          <Link
            to={`/producto/${producto.codigo}`}
            className="btn btn-custom btn-agregar mt-auto w-100"
          >
            <i className="bi bi-eye me-1"></i> Ver producto
          </Link>
        </div>
      </div>
    </div>
  );
}
