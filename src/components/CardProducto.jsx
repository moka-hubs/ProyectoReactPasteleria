
import React from 'react';
export default function Productos({ producto, onAgregarAlCarrito }) {


  if (!producto){
    return null

  }

    return (
        
     <div className="col-12 col-sm-6 col-md-3 mb-4 d-flex">
        <div className="cardPasteleria d-flex flex-column h-100">
          <img
          src={`/img/${producto.imagen}`}
          alt={producto.nombre}
          className="img-fluid my-3"
          style={{ maxHeight: "250px", objectFit: "cover" }}
        />
        <div style={{ minHeight: "60px" }} className="d-flex align-items-center justify-content-center text-center">
                    <h3 className="titulo-card fs-7 fw-bold m-0">{producto.nombre}</h3>
        </div>
        <p className="precio-card fw-bold text-center text-success my-2">${producto.precio} CLP</p>
        <p className="descripcion-card small text-muted flex-grow-1 text-center">
                    {producto.descripcion}
        </p>

        <button
        className="btn btn-custom btn-agregar mt-auto w-100"
         onClick={() => onAgregarAlCarrito(producto.codigo)}>
        Agregar al carro
        
        </button>

        </div>

     </div>



    );
    
};