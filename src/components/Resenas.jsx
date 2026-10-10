import React from 'react';

export default function Resenas() {
  const resenas = [
    {
      id: 1,
      nombre: "María José Gómez",
      producto: "Torta Cuadrada de Chocolate",
      comentario: "¡La mejor torta que he probado en años! El bizcocho súper húmedo y el ganache tiene la cantidad justa de dulzor. Ideal para celebraciones.",
      estrellas: 5,
      fecha: "Hace 2 días"
    },
    {
      id: 2,
      nombre: "Carlos Silva",
      producto: "Pie de Limón con Merengue",
      comentario: "El equilibrio perfecto entre lo ácido del limón y la suavidad del merengue italiano. Llegó en perfecto estado y muy fresco.",
      estrellas: 5,
      fecha: "Hace 1 semana"
    },
    {
      id: 3,
      nombre: "Valentina Rojas",
      producto: "Brownie Sin Gluten",
      comentario: "Cuesta mucho encontrar buena pastelería sin gluten, pero este brownie superó todas mis expectativas. Con mucho sabor y textura perfecta.",
      estrellas: 5,
      fecha: "Hace 2 semanas"
    }
  ];

  return (
    <section className="container my-5 py-4" id="resenas">
      <h3 className="text-center mb-2">Lo Que Dicen Nuestros Clientes</h3>
      <p className="text-center text-muted mb-5">
        Descubre las experiencias de quienes ya disfrutan de nuestras preparaciones artesanales.
      </p>

      <div className="row justify-content-center">
        {resenas.map((resena) => (
          <div key={resena.id} className="col-12 col-md-6 col-lg-4 d-flex mb-4">
            <div className="cardPasteleria w-100 d-flex flex-column justify-content-between p-4">
              <div>
                {/* Estrellas */}
                <div className="mb-2 text-warning fs-5">
                  {[...Array(resena.estrellas)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill me-1"></i>
                  ))}
                </div>

                {/* Comentario */}
                <p className="fst-italic fs-6 mb-3" style={{ color: "#5d4037" }}>
                  "{resena.comentario}"
                </p>
              </div>

              {/* Datos del cliente y producto */}
              <div className="border-top pt-3 mt-auto">
                <h5 className="fw-bold mb-1 fs-6" style={{ color: "#5d4037" }}>
                  {resena.nombre}
                </h5>
                <small className="text-muted d-block">
                  Compró: <span className="fw-semibold">{resena.producto}</span>
                </small>
                <small className="text-muted">{resena.fecha}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
