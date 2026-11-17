import { request } from "./client";


export const obtenerCategorias = () => request("/api/v1/categorias");
export const buscarCategoria = (id) => request(`/api/v1/categorias/${id}`);
export const agregarCategoria = (categoria) => request("/api/v1/categorias","POST",categoria);
export const eliminarCategoria = (id) => request(`/api/v1/categorias/${id}`,"DELETE");
export const actualizarCategoria = (id, categoria) => request(`/api/v1/categorias/${id}`,"PUT",categoria);