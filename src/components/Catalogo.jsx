import { useState } from 'react'
import Productos from './CardProducto';
import {productosIniciales,CATEGORIAS} from '../data/productos';
import { useApp } from '../context/Contexto';


export default function Catalogo() {
    const { agregarAlCarrito, categoriaSeleccionada } = useApp();

    const categoriaActual = categoriaSeleccionada || 'Todos Los Productos';

    const productosFiltrados = (
      categoriaActual === 'Todos Los Productos' ||
      categoriaActual === 'Todos los productos' ||
      categoriaActual === 'Nuestros Productos Destacados'
    )
      ? productosIniciales
      : productosIniciales.filter(p => p.categoria.toLowerCase() === categoriaActual.toLowerCase());

    const tituloCatalogo = (
      categoriaActual === 'Todos Los Productos' ||
      categoriaActual === 'Todos los productos' ||
      categoriaActual === 'Nuestros Productos Destacados'
    )
      ? "Todos Nuestros Productos"
      : categoriaActual;



    return(
        <div className="container my-4" id="catalogo" >
      <h1 className="mb-4 text-center" id='tituloCatalogo'>{tituloCatalogo}</h1>
      <div className="row">
        {productosFiltrados.map(producto => (
          <Productos
            key={producto.codigo} 
            producto={producto} 
             onClick={() => agregarAlCarrito(producto.codigo)}
          />
        ))}
      </div>
    </div>





    );

    
};