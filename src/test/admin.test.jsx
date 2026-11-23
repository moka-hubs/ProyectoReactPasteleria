import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import ProductosAdmin from "../components/Admin/ProductosAdmin";
import CategoriasAdmin from "../components/Admin/CategoriasAdmin";
import UsuariosAdmin from "../components/Admin/UsuariosAdmin";
import Dashboard from "../pages/Dashboard";

const mocks = vi.hoisted(() => ({
  useApp: vi.fn(),
  agregarProducto: vi.fn(),
  actualizarProducto: vi.fn(),
  eliminarProducto: vi.fn(),
  recargarProductos: vi.fn(),
  agregarCategoria: vi.fn(),
  actualizarCategoria: vi.fn(),
  eliminarCategoria: vi.fn(),
  recargarCategorias: vi.fn(),
  obtenerUsuarios: vi.fn(),
  agregarUsuario: vi.fn(),
  actualizarUsuario: vi.fn(),
  eliminarUsuario: vi.fn(),
}));

vi.mock("../context/useApp", () => ({ useApp: mocks.useApp }));
vi.mock("../api/productosApi", () => ({
  agregarProducto: mocks.agregarProducto,
  actualizarProducto: mocks.actualizarProducto,
  eliminarProducto: mocks.eliminarProducto,
}));
vi.mock("../api/categoriaApi", () => ({
  agregarCategoria: mocks.agregarCategoria,
  actualizarCategoria: mocks.actualizarCategoria,
  eliminarCategoria: mocks.eliminarCategoria,
}));
vi.mock("../api/usuariosApi", () => ({
  obtenerUsuarios: mocks.obtenerUsuarios,
  agregarUsuario: mocks.agregarUsuario,
  actualizarUsuario: mocks.actualizarUsuario,
  eliminarUsuario: mocks.eliminarUsuario,
}));

const producto = {
  codigo: "TC001",
  nombre: "Torta Cuadrada de Chocolate",
  categoria: "Tortas Cuadradas",
  imagen: "torta.png",
  precio: 45000,
  stock: 8,
  descripcion: "Deliciosa torta de chocolate con ganache y avellanas.",
};

const categorias = [
  { id_categoria: 1, nombre_categoria: "Todos Los Productos" },
  { id_categoria: 3, nombre_categoria: "Tortas Cuadradas" },
];

beforeEach(() => {
  vi.clearAllMocks();
  window.scrollTo = vi.fn();
  mocks.obtenerUsuarios.mockResolvedValue([
    {
      id: 2,
      nombreUsuario: "Pedro",
      apellidoUsuario: "Manriquez",
      correoUsuario: "pedro@ejemplo.com",
      fechaNacUsuario: "1994-10-20T00:00:00.000Z",
      rol: "CLIENTE",
      cuponBienvenida: null,
    },
  ]);
  mocks.useApp.mockReturnValue({
    productos: [producto],
    productosLoading: false,
    productosError: null,
    recargarProductos: mocks.recargarProductos,
    categorias,
    recargarCategorias: mocks.recargarCategorias,
    currentUser: { id: 1, isAdmin: true },
  });
});

test("crea un producto con el contrato del backend", async () => {
  render(<ProductosAdmin />);

  fireEvent.click(screen.getByText("Nuevo producto"));
  fireEvent.change(screen.getByLabelText("Código"), { target: { value: "ZZ999" } });
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Torta de Prueba" } });
  fireEvent.change(screen.getByLabelText("Categoría"), { target: { value: "Tortas Cuadradas" } });
  fireEvent.change(screen.getByLabelText("Precio"), { target: { value: "20000" } });
  fireEvent.change(screen.getByLabelText("Stock"), { target: { value: "5" } });
  fireEvent.change(screen.getByLabelText("URL de la imagen"), { target: { value: "https://ejemplo.com/torta.png" } });
  fireEvent.change(screen.getByLabelText("Descripción"), {
    target: { value: "Torta de prueba para verificar el formulario." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

  await waitFor(() =>
    expect(mocks.agregarProducto).toHaveBeenCalledWith(
      expect.objectContaining({ codigo: "ZZ999", precio: 20000, stock: 5 }),
    ),
  );
  expect(mocks.recargarProductos).toHaveBeenCalled();
});

test("elimina un producto después de confirmar", async () => {
  render(<ProductosAdmin />);

  fireEvent.click(screen.getByLabelText("Eliminar Torta Cuadrada de Chocolate"));
  fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

  await waitFor(() => expect(mocks.eliminarProducto).toHaveBeenCalledWith("TC001"));
  expect(mocks.recargarProductos).toHaveBeenCalled();
});

test("crea una categoría", async () => {
  render(<CategoriasAdmin />);

  fireEvent.click(screen.getByText("Nueva categoría"));
  fireEvent.change(screen.getByLabelText("Nombre de la categoría"), {
    target: { value: "Tortas Especiales" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

  await waitFor(() =>
    expect(mocks.agregarCategoria).toHaveBeenCalledWith({ nombre_categoria: "Tortas Especiales" }),
  );
  expect(mocks.recargarCategorias).toHaveBeenCalled();
});

test("edita un usuario sin enviar la contraseña si se deja vacía", async () => {
  render(<UsuariosAdmin />);

  await screen.findByText("pedro@ejemplo.com");
  fireEvent.click(screen.getByLabelText("Editar Pedro"));
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Pedro Actualizado" } });
  fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

  await waitFor(() =>
    expect(mocks.actualizarUsuario).toHaveBeenCalledWith(
      2,
      expect.objectContaining({ nombreUsuario: "Pedro Actualizado" }),
    ),
  );
  expect(mocks.actualizarUsuario.mock.calls[0][1]).not.toHaveProperty("contraseniaUsuario");
});

test("crea un usuario con rol CLIENTE", async () => {
  render(<UsuariosAdmin />);

  fireEvent.click(screen.getByText("Nuevo usuario"));
  fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Ana" } });
  fireEvent.change(screen.getByLabelText("Apellido"), { target: { value: "Pérez" } });
  fireEvent.change(screen.getByLabelText("Correo electrónico"), {
    target: { value: "ana@ejemplo.com" },
  });
  fireEvent.change(screen.getByLabelText(/Contraseña/), { target: { value: "Clave123" } });
  fireEvent.change(screen.getByLabelText("Fecha de nacimiento"), {
    target: { value: "2000-05-10" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

  await waitFor(() =>
    expect(mocks.agregarUsuario).toHaveBeenCalledWith(
      expect.objectContaining({
        correoUsuario: "ana@ejemplo.com",
        rol: "CLIENTE",
        contraseniaUsuario: "Clave123",
      }),
    ),
  );
});

test("el dashboard permite pasar del resumen a la administración", () => {
  render(<Dashboard />);

  expect(screen.getByText("Ventas del mes")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Administración/ }));
  expect(screen.getByText("Nuevo producto")).toBeInTheDocument();
});
