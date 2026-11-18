import { request } from "./client";

export const obtenerPerfil = () => request("/api/v1/perfil");

export const actualizarPerfil = ({
  nombreUsuario,
  apellidoUsuario,
  fechaNacUsuario,
}) =>
  request("/api/v1/perfil", "PUT", {
    nombreUsuario,
    apellidoUsuario,
    fechaNacUsuario,
  });
