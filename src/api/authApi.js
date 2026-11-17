import { request } from "./client";


export const login = (username,password)=> request("/api/v1/auth/login","POST",{correo,password});
export const registro = (username,password)=> request("/api/v1/auth/registro","POST",{nombreUsuario,apellidoUsuario,correoUsuario,contraseniaUsuario,fechaNacUsuario,cuponBienvenida});