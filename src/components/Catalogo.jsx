import Productos from './CardProducto';
import { useApp } from '../context/useApp';

export default function Catalogo() {
    const {
      agregarAlCarrito,
      categoriaSeleccionada,
      productos,
      productosLoading,
      productosError,
    } = useApp();

    const categoriaActual = categoriaSeleccionada || 'Todos Los Productos';

    const todasLasCategorias =
      categoriaActual === 'Todos Los Productos' ||
      categoriaActual === 'Todos los productos' ||
      categoriaActual === 'Nuestros Productos Destacados';

    const productosFiltrados = todasLasCategorias
      ? productos
      : productos.filter(p => p.categoria.toLowerCase() === categoriaActual.toLowerCase());

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
