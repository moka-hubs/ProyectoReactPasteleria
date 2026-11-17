import { request } from "./client"

export const obtenerUsuarios  = () => request("/api/v1/usuarios");
export const buscarUsuario = (id) => request(`/api/v1/usuarios/${id}`);
export const agregarUsuario = (usuario) => request("/api/v1/usuarios","POST",usuario);
export const eliminarUsuario = (id) => request(`/api/v1/usuarios/${id}`,"DELETE");
export const actualizarUsuario = (id, usuario) => request(`/api/v1/usuarios/${id}`,"PUT",usuario);

