import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import Dashboard from "../pages/Dashboard";
import { formatoMoneda } from "../utils/formato";

const mocks = vi.hoisted(() => ({
    obtenerDashboard: vi.fn(),
    cambiarEstadoPedido: vi.fn(),
}));

vi.mock("../api/dashboardApi", () => ({
    obtenerDashboard: mocks.obtenerDashboard,
    cambiarEstadoPedido: mocks.cambiarEstadoPedido,
    obtenerCostos: vi.fn().mockResolvedValue({}),
}));

const datos = {
    kpis: {
        ventasTotal: 120000,
        gananciaTotal: 45000,
        ventasConCostoTotal: 100000,
        pedidosTotal: 5,
        unidadesTotal: 9,
        ventasMes: 80000,
        ventasMesAnterior: 40000,
        gananciaMes: 30000,
        gananciaMesAnterior: 15000,
        pedidosMes: 3,
        pedidosMesAnterior: 2,
        ticketPromedio: 26667,
        clientesNuevosMes: 2,
        productosAgotados: 1,
        productosStockBajo: 2,
        productosSinCosto: 4,
    },
    ventasPorCategoria: [{ categoria: "Tortas Cuadradas", monto: 70000 }],
    topProductos: [{ nombre: "Torta Cuadrada de Chocolate", unidades: 2, ingresos: 90000 }],
    pedidosRecientes: [
        { id: 7, cliente: "Pedro Manriquez", total: 65000, estado: "PENDIENTE", fecha: "2026-11-23T10:00:00" },
    ],
};

beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
});

test("muestra ventas totales, ganancia y margen con datos reales", async () => {
    mocks.obtenerDashboard.mockResolvedValue(datos);
    render(<Dashboard />);

    expect(await screen.findByText(formatoMoneda(120000))).toBeInTheDocument(); // ventas totales
    expect(screen.getByText(formatoMoneda(45000))).toBeInTheDocument(); // ganancia total
    expect(screen.getByText("45%")).toBeInTheDocument(); // margen = 45.000 / 100.000
    expect(screen.getByText("Pedro Manriquez")).toBeInTheDocument();
});

test("avisa cuando hay productos sin costo registrado", async () => {
    mocks.obtenerDashboard.mockResolvedValue(datos);
    render(<Dashboard />);

    expect(await screen.findByText(/4 producto\(s\) sin costo registrado/)).toBeInTheDocument();
});
