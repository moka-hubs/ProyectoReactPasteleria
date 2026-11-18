import { request } from "./client";

export const login = (correo, password) =>
  request("/api/v1/auth/login", "POST", { correo, password });

// ModalRegistro entrega { nombre, apellido, correo, password, fecha, cupon }.
// RegisterRequest espera estos otros nombres. El back valida el cupón (FELICES50).
export const registro = ({ nombre, apellido, correo, password, fecha, cupon }) =>
  request("/api/v1/auth/registro", "POST", {
    nombreUsuario: nombre,
    apellidoUsuario: apellido,
    correoUsuario: correo,
    contraseniaUsuario: password,
    fechaNacUsuario: fecha,
    cuponBienvenida: cupon?.trim() || null,
  });
