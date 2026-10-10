const kpis = [
    { titulo: "Ventas del mes", valor: "$2.450.000", detalle: "+12% vs. mes anterior", icono: "bi-cash-coin" },
    { titulo: "Pedidos", valor: "128", detalle: "+8% vs. mes anterior", icono: "bi-bag-check" },
    { titulo: "Ticket promedio", valor: "$19.141", detalle: "por pedido", icono: "bi-receipt" },
    { titulo: "Clientes nuevos", valor: "24", detalle: "este mes", icono: "bi-people" },
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
    { nombre: "Caja de 6 Alfajores Artesanales", unidades: 36, ingresos: "$270.000" },
];

const pedidosRecientes = [
    { numero: "#1042", cliente: "Marcelo Dervis", total: "$45.000", estado: "Entregado" },
    { numero: "#1041", cliente: "Paulo Riveros", total: "$18.500", estado: "En preparación" },
    { numero: "#1040", cliente: "Joaquin Fuenzalida", total: "$52.990", estado: "Entregado" },
    { numero: "#1039", cliente: "Marcelo Dervis", total: "$12.000", estado: "Pendiente" },
    { numero: "#1038", cliente: "Paulo Riveros", total: "$27.990", estado: "Entregado" },
];

const colorEstado = [
    Entregado: "bg-success",
    "En preparación": "bg-warning text-dark",
    Pendiente: "bg-secondary",   
]