import { useEffect, useState } from "react";
import Administracion from "../components/Admin/Administracion";
import { useApp } from "../context/useApp";
import { cambiarEstadoPedido } from "../api/dashboardApi";
import { formatoMoneda } from "../utils/formato";

const ESTADOS = {
  PENDIENTE: { texto: "Pendiente", clase: "bg-secondary" },
  EN_PREPARACION: { texto: "En preparación", clase: "bg-warning text-dark" },
  ENTREGADO: { texto: "Entregado", clase: "bg-success" },
};

const variacion = (actual, anterior) => {
  if (!anterior) return actual ? "Sin datos del mes anterior" : "Sin movimiento aún";
  const pct = Math.round(((actual - anterior) / anterior) * 100);
  return `${pct >= 0 ? "+" : ""}${pct}% vs. mes anterior`;
};

function TarjetaKpi({ titulo, valor, detalle, icono }) {
  return (
      <div className="col-6 col-lg-3">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small fw-semibold">{titulo}</span>
              <i className={`bi ${icono} fs-4`} style={{ color: "#d25380" }}></i>
            </div>
            <div className="fs-4 fw-bold text-nowrap" style={{ color: "#5d4037" }}>
              {valor}
            </div>
            <div className="text-muted small">{detalle}</div>
          </div>
        </div>
      </div>
  );
}

function Resumen() {
  const { dashboard: datos, dashboardLoading, dashboardError, recargarDashboard } = useApp();
  const [errorCambio, setErrorCambio] = useState(null);

  const cambiarEstado = async (id, estado) => {
    try {
      setErrorCambio(null);
      await cambiarEstadoPedido(id, estado);
      await recargarDashboard();
    } catch (e) {
      setErrorCambio(e.message || "No se pudo cambiar el estado");
    }
  };

  const k = datos?.kpis;
  const ventasPorCategoria = datos?.ventasPorCategoria ?? [];
  const topProductos = datos?.topProductos ?? [];
  const pedidosRecientes = datos?.pedidosRecientes ?? [];
  const maximo = Math.max(1, ...ventasPorCategoria.map((c) => c.monto));

  // Mientras llegan los datos se muestran las tarjetas con "—".
  const dinero = (valor) => (k ? formatoMoneda(valor) : "—");
  const numero = (valor) => (k ? String(valor) : "—");
  const margen = k
      ? k.ventasConCostoTotal > 0
          ? `${Math.round((k.gananciaTotal / k.ventasConCostoTotal) * 100)}%`
          : "—"
      : "—";

  const historico = [
    { titulo: "Ventas totales", valor: dinero(k?.ventasTotal), detalle: "desde el inicio", icono: "bi-cash-stack" },
    { titulo: "Ganancia total", valor: dinero(k?.gananciaTotal), detalle: "ventas menos costos", icono: "bi-piggy-bank" },
    { titulo: "Margen de ganancia", valor: margen, detalle: "ganancia / ventas con costo", icono: "bi-percent" },
    { titulo: "Pedidos totales", valor: numero(k?.pedidosTotal), detalle: k ? `${k.unidadesTotal} unidades vendidas` : "", icono: "bi-bag-check" },
  ];

  const delMes = [
    { titulo: "Ventas del mes", valor: dinero(k?.ventasMes), detalle: k ? variacion(k.ventasMes, k.ventasMesAnterior) : "", icono: "bi-cash-coin" },
    { titulo: "Ganancia del mes", valor: dinero(k?.gananciaMes), detalle: k ? variacion(k.gananciaMes, k.gananciaMesAnterior) : "", icono: "bi-graph-up-arrow" },
    { titulo: "Ticket promedio", valor: dinero(k?.ticketPromedio), detalle: k ? `${k.pedidosMes} pedidos este mes` : "", icono: "bi-receipt" },
    { titulo: "Clientes nuevos", valor: numero(k?.clientesNuevosMes), detalle: "este mes", icono: "bi-people" },
  ];

  const inventario = [
    { titulo: "Productos agotados", valor: numero(k?.productosAgotados), detalle: "stock en 0", icono: "bi-x-octagon" },
    { titulo: "Stock bajo", valor: numero(k?.productosStockBajo), detalle: "3 unidades o menos", icono: "bi-exclamation-triangle" },
    { titulo: "Sin costo registrado", valor: numero(k?.productosSinCosto), detalle: "no entran a la ganancia", icono: "bi-question-circle" },
  ];

  return (
      <div>
        {(dashboardError || errorCambio) && (
            <div className="alert alert-danger">{dashboardError || errorCambio}</div>
        )}
        {dashboardLoading && !datos && <p className="text-muted small">Cargando resumen...</p>}
        {k && k.productosSinCosto > 0 && (
            <div className="alert alert-warning">
              Hay {k.productosSinCosto} producto(s) sin costo registrado: sus ventas no se
              incluyen en la ganancia. Regístralo en Administración → Productos.
            </div>
        )}

        <h6 className="text-muted fw-semibold">Totales</h6>
        <div className="row g-3 mb-4">{historico.map((x) => <TarjetaKpi key={x.titulo} {...x} />)}</div>

        <h6 className="text-muted fw-semibold">Mes en curso</h6>
        <div className="row g-3 mb-4">{delMes.map((x) => <TarjetaKpi key={x.titulo} {...x} />)}</div>

        <h6 className="text-muted fw-semibold">Inventario</h6>
        <div className="row g-3 mb-4">{inventario.map((x) => <TarjetaKpi key={x.titulo} {...x} />)}</div>

        <div className="row g-3 mb-4">
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-4" style={{ color: "#5d4037" }}>
                  Ventas por categoria
                </h5>
                {ventasPorCategoria.length === 0 && (
                    <p className="text-muted small mb-0">Aún no hay ventas este mes.</p>
                )}
                {ventasPorCategoria.map((c) => (
                    <div key={c.categoria} className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span>{c.categoria}</span>
                        <span className="fw-semibold">{formatoMoneda(c.monto)}</span>
                      </div>
                      <div className="progress" style={{ height: "10px" }}>
                        <div
                            className="progress-bar"
                            style={{ width: `${(c.monto / maximo) * 100}%`, backgroundColor: "#d25380" }}
                        ></div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-3" style={{ color: "#5d4037" }}>
                  Productos más Vendidos
                </h5>
                {topProductos.length === 0 ? (
                    <p className="text-muted small mb-0">Aún no hay ventas este mes.</p>
                ) : (
                    <div className="table-responsive">
                      <table className="table table-sm align-middle mb-0">
                        <thead>
                        <tr>
                          <th>Producto</th>
                          <th className="text-end">Unidades</th>
                          <th className="text-end">Ingresos</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topProductos.map((p) => (
                            <tr key={p.nombre}>
                              <td>{p.nombre}</td>
                              <td className="text-end">{p.unidades}</td>
                              <td className="text-end">{formatoMoneda(p.ingresos)}</td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3" style={{ color: "#5d4037" }}>
              Pedidos recientes
            </h5>
            {pedidosRecientes.length === 0 ? (
                <p className="text-muted small mb-0">Aún no hay pedidos.</p>
            ) : (
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead>
                    <tr>
                      <th>N°</th>
                      <th>Cliente</th>
                      <th className="text-end">Total</th>
                      <th className="text-end">Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pedidosRecientes.map((p) => (
                        <tr key={p.id}>
                          <td>#{p.id}</td>
                          <td>{p.cliente}</td>
                          <td className="text-end">{formatoMoneda(p.total)}</td>
                          <td className="text-end">
                        <span className={`badge ${ESTADOS[p.estado]?.clase} me-2`}>
                          {ESTADOS[p.estado]?.texto || p.estado}
                        </span>
                            <select
                                className="form-select form-select-sm d-inline-block w-auto"
                                aria-label={`Cambiar estado del pedido ${p.id}`}
                                value={p.estado}
                                onChange={(e) => cambiarEstado(p.id, e.target.value)}
                            >
                              {Object.entries(ESTADOS).map(([valor, { texto }]) => (
                                  <option key={valor} value={valor}>
                                    {texto}
                                  </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}

export default function Dashboard() {
  const [vista, setVista] = useState("resumen");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <main className="container my-5">
        <h1 className="fs-2">Panel de Administración</h1>
        <ul className="nav nav-pills mb-4 gap-2">
          <li className="nav-item">
            <button
                type="button"
                className={`nav-link ${vista === "resumen" ? "active" : ""}`}
                style={vista === "resumen" ? { backgroundColor: "#d25380" } : { color: "#5d4037" }}
                onClick={() => setVista("resumen")}
            >
              <i className="bi bi-bar-chart me-1"></i>Resumen
            </button>
          </li>
          <li className="nav-item">
            <button
                type="button"
                className={`nav-link ${vista === "administracion" ? "active" : ""}`}
                style={vista === "administracion" ? { backgroundColor: "#d25380" } : { color: "#5d4037" }}
                onClick={() => setVista("administracion")}
            >
              <i className="bi bi-sliders me-1"></i>Administración
            </button>
          </li>
        </ul>

        {vista === "resumen" ? <Resumen /> : <Administracion />}
      </main>
  );
}
