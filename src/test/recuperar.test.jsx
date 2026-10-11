import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import { AppProvider, useApp } from "../context/Contexto";
import { useState } from "react";

function RecuperarDemo() {
  const { recuperarPassword } = useApp();
  const [res, setRes] = useState("");
  return (
    <div>
      <button
        onClick={() => {
          const prueba = recuperarPassword("ana@correo.cl");
          setRes(prueba.success ? prueba.password : prueba.message);
        }}
      >
        Recuperar
      </button>
      <p>Resultado: {res}</p>
    </div>
  );
}

afterEach(() => {
  cleanup();
  localStorage.clear();
});

test("recuperarPassword devuelve la contraseña de un correo registrado", () => {
  localStorage.setItem(
    "pasteleria_mil_sabores",
    JSON.stringify([{ correo: "ana@correo.cl", password: "Doki21431.@" }]),
  );

  render(
    <AppProvider>
      <RecuperarDemo />
    </AppProvider>,
  );

  fireEvent.click(screen.getByText("Recuperar"));

  expect(screen.getByText("Resultado: Doki21431.@")).toBeInTheDocument();
});