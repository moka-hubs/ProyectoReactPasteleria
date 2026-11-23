const formatoCLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function formatoMoneda(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? formatoCLP.format(numero) : "-";
}

// Java serializa java.util.Date como ISO (2026-11-22T00:00:00.000Z).
// El input type="date" necesita solamente YYYY-MM-DD.
export function fechaParaInput(valor) {
  if (!valor) return "";
  return String(valor).slice(0, 10);
}
