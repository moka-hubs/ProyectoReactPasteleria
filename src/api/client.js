import { cerrarSesion, getToken } from "../auth/auth";

const API_URL = import.meta.env.VITE_API_URL || "";

export class ApiError extends Error {
  constructor(status, message) {
    super(message || `Error ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function request(endpoint, method = "GET", body) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (res.status === 401 && token) {
    cerrarSesion();
    window.location.assign("/");
    throw new ApiError(401, "Sesión expirada");
  }

  if (!res.ok) {
    let mensaje = `Error ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) mensaje = data.message;
    } catch {
      // El servidor no devolvió un cuerpo JSON.
    }
    throw new ApiError(res.status, mensaje);
  }

  if (res.status === 204) return null;
  return res.json();
}
