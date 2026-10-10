import { useMemo } from "react";
import { useApp } from "../context/Contexto";

const STOCK_BAJO = 5;

const clp = (numero) => `$${numero.toLocalString("es-CL")}`;

function TarjetaKpi({ icono, titulo, valor, detalle}) {
    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="text-muted small fw-semibold">{titulo}</span>
                    <i className={`bi ${icono} fs-4`} style={{ color: "#d25380" }}></i>
                </div>
                <div className="fs-4 fw-bold text-nowrap" style={{ color: "#5d4037"}}>
                    {valor}
                </div>
                {detalle && <div className="text-muted small">{detalle}</div>}
            </div>
        </div>
    );
}

export default function Dashboard() {
    const {productos, clientes} = useApp();

    const resumen = useMemo(() => {
        const valorInventario = productos.reduce(
            (total, p) => total + p.precio * p.stock,
            0,
        );
        const unidades = productos.reduce((total, p) => total + p.stock, 0);
        const precioPromedio = productos.length
            ? Math.round(
                productos.reduce((total, p) => total + p.precio, 0) /
                    productos.length,
            )
        :   0;

        const stockBajo = productos
            .filter((p) => p.stock <= STOCK_BAJO)
    })
}