import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { AppProvider, useApp } from "../context/Contexto";
import { expect, test } from "vitest";
import { afterEach } from "vitest";



function CarritoDemo() {
  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    totalCarrito,
    totalUnidades,
  } = useApp();

  return (
    <div>
      <button onClick={() => agregarAlCarrito("TC001")}>Agregar Torta</button>
      <button onClick={() => eliminarDelCarrito("TC001")}>Eliminar producto</button>
      <button onClick={vaciarCarrito}>Vaciar</button>
      <p>Unidades: {totalUnidades}</p>
      <p>Total: {totalCarrito}</p>
      <p>Items: {carrito.map((i) => `${i.codigo}x${i.cantidad}`).join(", ") || "vacío"}</p>
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

  expect(screen.getByText("Items: TC001x2")).toBeInTheDocument();
  expect(screen.getByText("Unidades: 2")).toBeInTheDocument();

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


test("Validar que el boton vaciar carrito limpie el carro en el local storage" , () =>{
  render(
    <AppProvider>
      <CarritoDemo/>
    </AppProvider>
  );
  fireEvent.click(screen.getByText("Agregar Torta"));
  expect(JSON.parse(localStorage.getItem("carrito"))).toHaveLength(1);

  fireEvent.click(screen.getByText("Vaciar"));

  expect(screen.getByText("Items: vacío")).toBeInTheDocument();
  expect(screen.getByText("Unidades: 0")).toBeInTheDocument();
  expect(localStorage.getItem("carrito")).toBe("[]");
  expect(JSON.parse(localStorage.getItem("carrito"))).toEqual([]);
});

