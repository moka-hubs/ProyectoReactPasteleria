import Productos from './CardProducto';
import { useApp } from '../context/useApp';

const normalizar = (texto) =>
  String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function Catalogo() {
    const {
      agregarAlCarrito,
      categoriaSeleccionada,
      productos,
      productosLoading,
      productosError,
    } = useApp();

    const categoriaActual = categoriaSeleccionada || 'Todos Los Productos';
    const categoriaNormalizada = normalizar(categoriaActual);

    const todasLasCategorias =
      categoriaNormalizada === normalizar('Todos Los Productos') ||
      categoriaNormalizada === normalizar('Nuestros Productos Destacados');

    const productosFiltrados = todasLasCategorias
      ? productos
      : productos.filter(p => normalizar(p.categoria) === categoriaNormalizada);

    const tituloCatalogo = todasLasCategorias
      ? "Todos Nuestros Productos"
      : categoriaActual;

    return(
        <div className="container my-4" id="catalogo" >
          <h1 className="mb-4 text-center" id='tituloCatalogo'>{tituloCatalogo}</h1>

          {productosError && (
            <p className="text-center text-danger">
              No se pudieron cargar los productos: {productosError}
            </p>
          )}

          {productosLoading && (
            <p className="text-center text-muted">Cargando productos...</p>
          )}

          <div className="row">
            {productosFiltrados.map(producto => (
              <Productos
                key={producto.codigo}
                producto={producto}
                onClick={() => agregarAlCarrito(producto.codigo)}
              />
            ))}
          </div>
        </div>
    );
};
