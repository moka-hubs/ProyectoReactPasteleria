import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import { AppProvider, useApp } from "../context/Contexto";
import { useState } from "react";

function RegistrarDemo() {
  const { register } = useApp();
  const [res, setRes] = useState("");
  return (
    <div>
      <button onClick={() => {
        const r = register({
          nombre: "Ana",
          apellido: "Pérez",
          correo: "ana@correo.cl",
          password: "ABCJFEUW1234",
          fechaNacimiento: "2000-05-10",
        });
        setRes(r.success ? "registrado" : r.message);
      }}>Registrar</button>
      <p>Resultado: {res}</p>
    </div>
  );
}
afterEach(() => {
  cleanup();
  localStorage.clear();
});

test("no permite registrar un correo duplicado", () => {
  localStorage.setItem("pasteleria_mil_sabores", JSON.stringify([
    { nombre: "Ana", apellido: "Pérez", correo: "ana@correo.cl", password: "ABCJFEUW1234" }
  ]));

  render(
  <AppProvider>
    <RegistrarDemo />
    </AppProvider>);
  fireEvent.click(screen.getByText("Registrar"));

  expect(screen.getByText("Resultado: El correo ya se encuentra registrado")).toBeInTheDocument();
});