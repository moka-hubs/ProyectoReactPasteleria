import { useState } from 'react'
import Productos from './CardProducto';
import {productosIniciales,CATEGORIAS} from '../data/productos';


export default function Catalogo() {


    const [categoriaSeleccionada,setCategoriaSeleccionada] = useState ("Nuestros Productos Destacados")

    const productosFiltrados = categoriaSeleccionada === 'Nuestros Productos Destacados'

    ?productosIniciales
    :productosIniciales.filter(p => p.categoria === categoriaSeleccionada);

    const tituloCatalogo = categoriaSeleccionada === 'Todos Los Productos'
    ? "Todos Nuestros Productos"
    : categoriaSeleccionada;


     const agregarAlCarrito = (codigo) => {
    
    
  };



    return(
        <div className="container my-4" id="catalogo" >
      <h1 className="mb-4 text-center" id='tituloCatalogo'>{tituloCatalogo}</h1>
      <div className="row">
        {productosFiltrados.map(producto => (
          <Productos
            key={producto.codigo} 
            producto={producto} 
            onAgregarAlCarrito={agregarAlCarrito} 
          />
        ))}
      </div>
    </div>





    );

    
};