
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
        <h3>{producto.nombre}</h3>
        <p>${producto.precio} CLP</p>
        <p> {producto.descripcion} </p>
        <button
        className="btn btn-custom btn-agregar mt-auto w-100"
         onClick={() => onAgregarAlCarrito(producto.codigo)}>
        Agregar al carro
        </button>

        </div>

     </div>



    );
    
};