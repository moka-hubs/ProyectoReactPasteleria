import { request } from "./client";


export const login = (correo,password)=> request("/api/v1/auth/login","POST",{correo,password});
export const registro = (nombreUsuario,apellidoUsuario,correoUsuario,contraseniaUsuario,fechaNacUsuario,cuponBienvenida)=> request("/api/v1/auth/registro","POST",{nombreUsuario,apellidoUsuario,correoUsuario,contraseniaUsuario,fechaNacUsuario,cuponBienvenida});