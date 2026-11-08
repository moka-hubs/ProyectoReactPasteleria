import { request } from "./client"


export const obtenerProducto = () => request("/productos");
export const buscarProducto = (id) => request(`/productos/${id}`);
export const agregarProducto = (producto) => request("/productos/","POST",producto);
export const eliminarProducto = (id) => request(`/productos/${id}`,"DELETE");
export const actualizarProducto = (id, producto) => request(`/productos/${id}`,"PUT",producto);



