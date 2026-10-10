import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { expect, test, afterEach } from "vitest";
import { AppProvider } from "../context/Contexto";
import CardProducto from "../components/CardProducto";

const productoMock = {
  codigo: "TC001",
  imagen: "tortacuadradachocolate.png",
  categoria: "Tortas Cuadradas",
  nombre: "Torta Cuadrada de Chocolate",
  precio: 45000,
  stock: 8,
  descripcion:
    "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas personalizable con mensajes especiales.",
};

afterEach(() => {
  cleanup();
  localStorage.clear();
});

//Probar que se agregue el producto al carrito
test("El producto se debe agregar al carrito al hacer click en Agregar al carro", () => {
  render(
    <AppProvider>
      <MemoryRouter>
        <CardProducto producto={productoMock} />
      </MemoryRouter>
    </AppProvider>,
  );

  fireEvent.click(screen.getByText("Agregar al carro"));

  const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  expect(carritoGuardado).toHaveLength(1);
  expect(carritoGuardado[0].codigo).toBe("TC001");
});


//Probar que ver producto lleve a la pagina DetalleProducto

test("debe navegar a la ruta del detalle del producto al hacer click en 'Ver producto'", () => {
  render(
    <AppProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<CardProducto producto={productoMock} />} />
          
          <Route 
            path="/producto/:codigo" 
            element={<h1>Página de Detalle del Producto</h1>} 
          />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
  const enlaceVerProducto = screen.getByRole("link", { name: /ver producto/i });
  expect(enlaceVerProducto).toHaveAttribute("href", "/producto/TC001");
  fireEvent.click(enlaceVerProducto);
  expect(screen.getByText("Página de Detalle del Producto")).toBeInTheDocument();
});