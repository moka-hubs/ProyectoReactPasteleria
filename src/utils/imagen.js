/**
 * Resuelve la URL de una imagen de producto.
 *
 * - Si `imagen` ya es una URL absoluta (http/https, p. ej. un enlace publico
 *   de Google Drive) o un data URI, se usa tal cual.
 * - Si no, se interpreta como nombre de archivo dentro de /img (comportamiento
 *   original del proyecto).
 */
export function urlImagen(imagen) {
  if (!imagen) return "/img/logo.png";

  const valor = String(imagen).trim();

  if (/^https?:\/\//i.test(valor) || /^data:/i.test(valor)) {
    return valor;
  }

  return `/img/${valor}`;
}
