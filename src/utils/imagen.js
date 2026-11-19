/**
 * Resuelve la URL de una imagen de producto.
 *
 * - Si `imagen` ya es una URL absoluta (http/https, p. ej. un enlace publico
 *   de Google Drive) o un data URI, se usa tal cual.
 * - Las URLs de Drive con formato /uc?export=view se convierten al endpoint
 *   /thumbnail: el formato antiguo redirige a drive.usercontent.google.com,
 *   que envia `Cross-Origin-Resource-Policy: same-site` y hace que el
 *   navegador bloquee la imagen al incrustarla desde otro dominio.
 * - Si no, se interpreta como nombre de archivo dentro de /img (comportamiento
 *   original del proyecto).
 */
export function urlImagen(imagen) {
  if (!imagen) return "/img/logo.png";

  const valor = String(imagen).trim();

  if (/^https?:\/\//i.test(valor) || /^data:/i.test(valor)) {
    const idDrive = valor.match(
      /^https?:\/\/drive\.google\.com\/uc\?[^#]*\bid=([\w-]+)/i,
    )?.[1];

    if (idDrive) {
      return `https://drive.google.com/thumbnail?id=${idDrive}&sz=w1000`;
    }

    return valor;
  }

  return `/img/${valor}`;
}
