import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { AppProvider } from "../context/Contexto";
import { useApp } from "../context/useApp";
import ModalLogin from "../components/Modales/ModalLogin";




function AbrirLogin() {
  const { setIsLoginOpen } = useApp();
  return <button onClick={() => setIsLoginOpen(true)}>Abrir login</button>;
}


test("login con campos vacíos muestra error", () => {
  render(
    <AppProvider>
    <AbrirLogin />
    <ModalLogin />
    </AppProvider>);
  fireEvent.click(screen.getByText("Abrir login"));

  fireEvent.click(screen.getByText("Ingresar"));

  expect(screen.getByText("Debes ingresar tu correo y tu contraseña")).toBeInTheDocument();
});
