import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { AppProvider, useApp } from "../context/Contexto";
import { expect, test } from "vitest";
import { afterEach } from "vitest";



function CarritoDemo() {
  const { carrito, agregarAlCarrito } = useApp();
  return (
    <div>
      <button onClick={() => agregarAlCarrito("TC001")}>Agregar Torta</button>
      <p>Productos: {carrito.length}</p>
      <p>Cantidad: {carrito[0]?.cantidad ?? 0}</p>
    </div>
  );
}

    afterEach(() => {
  cleanup();
  localStorage.clear();
});

test("agregar dos veces el mismo producto deja una sola fila con cantidad 2", () => {
  render(<AppProvider><CarritoDemo /></AppProvider>);

  fireEvent.click(screen.getByText("Agregar Torta"));
  fireEvent.click(screen.getByText("Agregar Torta"));

  expect(screen.getByText("Productos: 1")).toBeInTheDocument();
  expect(screen.getByText("Cantidad: 2")).toBeInTheDocument();
});



test("Validar que el local storage almacene los productos", () => {
  render(
    <AppProvider>
      <CarritoDemo/>
    </AppProvider>
  );
  fireEvent.click(screen.getByText("Agregar Torta"));

  const guardar = JSON.parse(localStorage.getItem("carrito"));
  expect(guardar).toHaveLength(1);
  expect(guardar[0].codigo).toBe("TC001");
  expect(guardar[0].cantidad).toBe(1);
});

