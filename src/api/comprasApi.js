import { request } from "./client";

export const registrarCompra = (items) =>
  request("/api/v1/compras", "POST", { items });


