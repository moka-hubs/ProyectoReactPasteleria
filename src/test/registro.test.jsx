import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { expect, test, afterEach, vi } from "vitest";
import { AppProvider } from "../context/Contexto";
import { useApp } from "../context/useApp";
import { useState } from "react";
import { registro } from "../api/authApi";

// El back responde 409 con ese mensaje cuando el correo ya existe.
vi.mock("../api/authApi", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    registro: vi.fn(async () => {
      const error = new Error("Ya existe una cuenta con ese correo");
      error.status = 409;
      throw error;
    }),
  };
});

function RegistrarDemo() {
  const { register } = useApp();
  const [res, setRes] = useState("");
  return (
    <div>
      <button
        onClick={async () => {
          const r = await register({
            nombre: "Ana",
            apellido: "Pérez",
            correo: "ana@correo.cl",
            password: "ABCJFEUW1234",
            fecha: "2000-05-10",
          });
          setRes(r.success ? "registrado" : r.message);
        }}
      >
        Registrar
      </button>
      <p>Resultado: {res}</p>
    </div>
  );
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

test("no permite registrar un correo duplicado", async () => {
  render(
    <AppProvider>
      <RegistrarDemo />
    </AppProvider>,
  );
  fireEvent.click(screen.getByText("Registrar"));

  await waitFor(() =>
    expect(
      screen.getByText("Resultado: Ya existe una cuenta con ese correo"),
    ).toBeInTheDocument(),
  );

  // El modal entrega `fecha`, no `fechaNacimiento`.
  expect(registro).toHaveBeenCalledWith({
    nombre: "Ana",
    apellido: "Pérez",
    correo: "ana@correo.cl",
    password: "ABCJFEUW1234",
    fecha: "2000-05-10",
  });
});
