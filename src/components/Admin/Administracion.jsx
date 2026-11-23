import { useState } from "react";
import ProductosAdmin from "./ProductosAdmin";
import CategoriasAdmin from "./CategoriasAdmin";
import UsuariosAdmin from "./UsuariosAdmin";

const PESTANAS = [
  { id: "productos", etiqueta: "Productos", icono: "bi-cake2" },
  { id: "categorias", etiqueta: "Categorías", icono: "bi-tags" },
  { id: "usuarios", etiqueta: "Usuarios", icono: "bi-people" },
];

export default function Administracion() {
  const [activa, setActiva] = useState("productos");

  return (
    <div>
      <ul className="nav nav-tabs mb-4">
        {PESTANAS.map((pestana) => (
          <li className="nav-item" key={pestana.id}>
            <button
              type="button"
              className={`nav-link ${activa === pestana.id ? "active" : ""}`}
              style={
                activa === pestana.id
                  ? { color: "#d25380", borderColor: "#d25380", fontWeight: 600 }
                  : { color: "#5d4037" }
              }
              onClick={() => setActiva(pestana.id)}
            >
              <i className={`bi ${pestana.icono} me-1`}></i>
              {pestana.etiqueta}
            </button>
          </li>
        ))}
      </ul>

      {activa === "productos" && <ProductosAdmin />}
      {activa === "categorias" && <CategoriasAdmin />}
      {activa === "usuarios" && <UsuariosAdmin />}
    </div>
  );
}
