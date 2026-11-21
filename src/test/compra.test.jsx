import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { expect, test, afterEach, vi } from "vitest";
import { AppProvider } from "../context/Contexto";
import { useApp } from "../context/useApp";
import { CarritoOffcanvas } from "../components/CarritoOffCanvas";
import { registrarCompra } from "../api/comprasApi";

vi.mock("../api/comprasApi", () => ({
  registrarCompra: vi.fn(),
}));

vi.mock("../api/perfilApi", () => ({
  obtenerPerfil: vi.fn(async () => ({
    id: 1,
    nombreUsuario: "Ana",
    apellidoUsuario: "Pérez",
    correoUsuario: "ana@correo.cl",
    fechaNacUsuario: "2000-05-10T00:00:00.000Z",
    cuponBienvenida: null,
  })),
  actualizarPerfil: vi.fn(),
}));

function Demo() {
  const { agregarAlCarrito, currentUser } = useApp();
  return (
    <>
      <p>Usuario: {currentUser?.correoUsuario || "ninguno"}</p>
      <button onClick={() => agregarAlCarrito("TC001")}>Agregar</button>
      <CarritoOffcanvas />
    </>
  );
}

async function esperarSesion() {
  await waitFor(() =>
    expect(screen.getByText("Usuario: ana@correo.cl")).toBeInTheDocument(),
  );
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

// El checkout requiere sesion iniciada.
const simularSesion = () => localStorage.setItem("token_pasteleria", "token-de-prueba");

test("finalizar compra envia el carrito y lo vacia solo si el back confirma", async () => {
  simularSesion();
  registrarCompra.mockResolvedValue({ total: 45000, items: [] });

  render(
    <AppProvider>
      <Demo />
    </AppProvider>,
  );

  await esperarSesion();
  fireEvent.click(screen.getByText("Agregar"));
  fireEvent.click(screen.getByText("Finalizar Compra"));

  await waitFor(() => expect(JSON.parse(localStorage.getItem("carrito"))).toEqual([]));
  expect(registrarCompra).toHaveBeenCalledWith([{ codigo: "TC001", cantidad: 1 }]);
  expect(
    screen.getByText(/Compra realizada por \$45\.000 CLP/),
  ).toBeInTheDocument();
});

test("si el back reporta stock insuficiente el carrito se conserva", async () => {
  simularSesion();
  registrarCompra.mockRejectedValue(new Error("Stock insuficiente para TC001"));

  render(
    <AppProvider>
      <Demo />
    </AppProvider>,
  );

  await esperarSesion();
  fireEvent.click(screen.getByText("Agregar"));
  fireEvent.click(screen.getByText("Finalizar Compra"));

  await waitFor(() =>
    expect(screen.getByText("Stock insuficiente para TC001")).toBeInTheDocument(),
  );
  expect(JSON.parse(localStorage.getItem("carrito"))).toHaveLength(1);
});
