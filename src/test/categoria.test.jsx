import { expect, test } from "vitest";
import Catalogo from "../components/Catalogo";
import { AppProvider, useApp } from "../context/Contexto";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";



function CatalogoConFiltro() {
  const { setCategoriaSeleccionada } = useApp();
  return (
    <>
      <button onClick={() => setCategoriaSeleccionada("Productos Sin Azúcar")}>Filtrar</button>
      <Catalogo />
    </>
  );
}

test("el catálogo filtra por categoría", () => {
  render(
    <AppProvider>
    <MemoryRouter>
    <CatalogoConFiltro />
    </MemoryRouter>
    </AppProvider>
  );
  fireEvent.click(screen.getByText("Filtrar"));

  expect(screen.getByRole("heading", { name: "Productos Sin Azúcar" })).toBeInTheDocument();
  expect(screen.getAllByText("Agregar al carro")).toHaveLength(3);
});

