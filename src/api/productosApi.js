import { request } from "./client"


export const obtenerProducto = () => request("/api/v1/productos");
export const buscarProducto = (id) => request(`/api/v1/productos/${id}`);
export const agregarProducto = (producto) => request("/api/v1/productos/","POST",producto);
export const eliminarProducto = (id) => request(`/api/v1/productos/${id}`,"DELETE");
export const actualizarProducto = (id, producto) => request(`/api/v1/productos${id}`,"PUT",producto);



