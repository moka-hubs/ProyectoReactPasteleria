import { request } from "./client";

export const obtenerDashboard = () => request("/api/v1/dashboard");

// { "TC001": 18000, ... } solo para administradores.
export const obtenerCostos = () => request("/api/v1/dashboard/costos");

export const cambiarEstadoPedido = (id, estado) =>
    request(`/api/v1/pedidos/${id}/estado`, "PUT", { estado });
