const kpis = [
  {
    titulo: "Ventas del mes",
    valor: "$2.450.000",
    detalle: "+12% vs. mes anterior",
    icono: "bi-cash-coin",
  },
  {
    titulo: "Pedidos",
    valor: "128",
    detalle: "+8% vs. mes anterior",
    icono: "bi-bag-check",
  },
  {
    titulo: "Ticket promedio",
    valor: "$19.141",
    detalle: "por pedido",
    icono: "bi-receipt",
  },
  {
    titulo: "Clientes nuevos",
    valor: "24",
    detalle: "este mes",
    icono: "bi-people",
  },
];

const ventasPorCategoria = [
  { categoria: "Tortas Cuadradas", monto: 780000, texto: "$780.000" },
  { categoria: "Tortas Circulares", monto: 520000, texto: "$520.000" },
  { categoria: "Más Vendidos", monto: 470000, texto: "$470.000" },
  { categoria: "Postres Individuales", monto: 310000, texto: "$310.000" },
  { categoria: "Pastelería Tradicional", monto: 210000, texto: "$210.000" },
  { categoria: "Productos Sin Gluten", monto: 160000, texto: "$160.000" },
];

const topProductos = [
  { nombre: "Torta Cuadrada de Chocolate", unidades: 14, ingresos: "$630.000" },
  { nombre: "Torta Circular de Vainilla", unidades: 11, ingresos: "$440.000" },
  { nombre: "Cheesecake de Frutos Rojos", unidades: 9, ingresos: "$378.000" },
  { nombre: "Volcán de Chocolate Belga", unidades: 48, ingresos: "$312.000" },
  {
    nombre: "Caja de 6 Alfajores Artesanales",
    unidades: 36,
    ingresos: "$270.000",
  },
];

const pedidosRecientes = [
  {
    numero: "#1042",
    cliente: "Marcelo Dervis",
    total: "$45.000",
    estado: "Entregado",
  },
  {
    numero: "#1041",
    cliente: "Paulo Riveros",
    total: "$18.500",
    estado: "En preparación",
  },
  {
    numero: "#1040",
    cliente: "Joaquin Fuenzalida",
    total: "$52.990",
    estado: "Entregado",
  },
  {
    numero: "#1039",
    cliente: "Marcelo Dervis",
    total: "$12.000",
    estado: "Pendiente",
  },
  {
    numero: "#1038",
    cliente: "Paulo Riveros",
    total: "$27.990",
    estado: "Entregado",
  },
];

const colorEstado = {
  Entregado: "bg-success",
  "En preparación": "bg-warning text-dark",
  Pendiente: "bg-secondary",
};

export default function Dashboard() {
  const maximo = Math.max(...ventasPorCategoria.map((c) => c.monto));

  return (
    <main className="container my-5">
      <h1 className="fs-2">Panel de Administración</h1>
      <p className="fs-6 mb-4">
        Vista de ejemplo del panel. Los datos son ilustrativos.
      </p>

      <div>
        {kpis.map((k) => (
          <div key={k.titulo} className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small fw-semibold">
                    {k.titulo}
                  </span>
                  <i
                    className={`bi ${k.icono} fs-4`}
                    style={{ color: "#d25380" }}
                  ></i>
                </div>
                <div
                  className="fs-4 fw-bold text-nowrap"
                  style={{ color: "#5d4037" }}
                >
                  {k.valor}
                </div>
                <div className="text-muted small">{k.detalle}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-4" style={{ color: "#5d4037" }}>
                Ventas por categoria
              </h5>
              {ventasPorCategoria.map((c) => (
                <div key={c.categoria} className="mb-3">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>{c.categoria}</span>
                    <span className="fw-semibold">{c - texto}</span>
                  </div>
                  <div className="progress" style={{ height: "10px" }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(c.monto / maximo) * 100}%`,
                        backgroundColor: "#d25380",
                      }}
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
                        <td className="text-end">{p.ingresos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3" style={{ color: "#5d4037" }}>
            Pedidos recientes
          </h5>
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
                  <tr key={p.numero}>
                    <td>{p.numero}</td>
                    <td>{p.cliente}</td>
                    <td className="text-end">{p.total}</td>
                    <td className="text-end">
                      <span className={`badge ${colorEstado[p.estado]}`}>
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
