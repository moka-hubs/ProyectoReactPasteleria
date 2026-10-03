import React, { createContext, useContext, useState, useEffect } from "react";
import { productosIniciales, clientesIniciales } from "../data/productos";

const Contexto = createContext();

const STORAGE_USUARIOS = "pasteleria_mil_sabores";
const STORAGE_CARRITO = "carrito";

export function AppProvider({ children }) {
  const [productos] = useState(productosIniciales);
  const [clientes, setClientes] = useState(() => {
    const guardado = localStorage.getItem("clientes");
    return guardado ? JSON.parse(guardado) : clientesIniciales;
  });
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    "Todos los productos",
  );

  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_CARRITO);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  const [isCarroOpen, setisCarroOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistroOpen, setIsRegistroOpen] = useState(false);
  const [isRecuperarOpen, setisRecuperarOpen] = useState(false);
  const [ModalAgregadoInfo, setModalAgregado] = useState({
    isOpen: false,
    productoNombre: "",
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      let usuarios = JSON.parse(localStorage.getItem(STORAGE_USUARIOS)) || [];
      const adminExists = usuarios.some(
        (u) => u.email === "admin@pasteleria.cl",
      );
      if (!adminExists) {
        usuarios.push({
          nombre: "Administrador",
          apellido: "Pastelería",
          email: "admin@pasteleria.cl",
          password: "admin12345678",
          isAdmin: true,
        });
        localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(usuarios));
      }
    } catch (e) {
      console.error("Error al inicializar admin:", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (codigo) => {
    const prod = productos.find((p) => p.codigo === codigo);
    if (!prod) return;

    setCarrito((prev) => {
      const existe = prev.find((item) => item.codigo === codigo);
      if (existe) {
        return prev.map((item) =>
          item.codigo === codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...prev, { ...prod, cantidad: 1 }];
    });

    setModalAgregado({ isOpen: true, productoNombre: prod.nombre });
  };

  const eliminarDelCarrito = (codigo) => {
    setCarrito((prev) => prev.filter((item) => item.codigo !== codigo));
  };

  const cambiarCantidad = (codigo, delta) => {
    setCarrito((prev) => {
      return prev
        .map((item) => {
          if (item.codigo === codigo) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0
              ? { ...item, cantidad: nuevaCantidad }
              : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalCarrito = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );
  const totalUnidades = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const login = (correo, password) => {
    if (correo === "admin@pasteleria.cl" && password === "admin12345678") {
      const adminUser = { nombre: "Admin", correo, isAdmin: true };
      setCurrentUser(adminUser);
      return { success: true, isAdmin: true };
    }

    const usuarios = JSON.parse(localStorage.getItem(STORAGE_USUARIOS)) || [];
    const usuario = usuarios.find(
      (u) =>
        (u.correo === correo || u.email === correo) && u.password === password,
    );

    if (usuario) {
      setCurrentUser(usuario);
      return { success: true, isAdmin: false, user: usuario };
    }

    return { success: false, message: "Error en las credenciales" };
  };

  const register = (nuevoUsuario) => {
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_USUARIOS)) || [];
    const existe = usuarios.find(
      (u) =>
        u.correo === nuevoUsuario.correo || u.email === nuevoUsuario.correo,
    );
    if (existe) {
      return {
        success: false,
        message: "El correo ya se encuentra registrado",
      };
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(usuarios));

    // Agregar también a la lista de clientes para el dashboard
    const nuevosClientes = [
      ...clientes,
      {
        nombre: `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`,
        email: nuevoUsuario.correo,
      },
    ];
    setClientes(nuevosClientes);
    localStorage.setItem("clientes", JSON.stringify(nuevosClientes));

    return { success: true };
  };

  const recuperarPassword = (correo) => {
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_USUARIOS)) || [];
    const usuario = usuarios.find(
      (u) => u.correo === correo || u.email === correo,
    );
    if (usuario) {
      return { success: true, password: usuario.password };
    }
    return {
      success: false,
      message:
        "Este correo no se encuentra registrado en Pasteleria Mil Sabores",
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <Contexto.Provider
      value={{
        productos,
        clientes,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        totalCarrito,
        totalUnidades,
        isCarroOpen,
        setisCarroOpen,
        isLoginOpen,
        setIsLoginOpen,
        isRegistroOpen,
        setIsRegistroOpen,
        isRecuperarOpen,
        setisRecuperarOpen,
        ModalAgregadoInfo,
        setModalAgregado,
        currentUser,
        login,
        register,
        recuperarPassword,
        logout,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}

export const useApp = () => useContext(Contexto);
