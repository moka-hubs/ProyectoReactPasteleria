
import React from 'react';
export default function Productos({ producto, onAgregarAlCarrito }) {


  if (!producto){
    return null

  }

    return (
        
     <div className="card col-4 d-flex">
        <div className="d-flex flex-column h-100 p-3">
          <img
          src={`/img/${producto.imagen}`}
          alt={producto.nombre}
          className="img-fluid my-3"
          style={{ maxHeight: "250px", objectFit: "cover" }}
        />
        <h3>{producto.nombre}</h3>
        <p>${producto.precio} CLP</p>
        <p> {producto.descripcion} </p>
        <button onClick={() => onAgregarAlCarrito(producto.codigo)}>
        Agregar al carro
        </button>

        </div>

     </div>



    );
    
};