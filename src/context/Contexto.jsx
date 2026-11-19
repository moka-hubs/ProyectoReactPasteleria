import { useState, useEffect } from "react";
import { productosIniciales, clientesIniciales } from "../data/productos";
import { Contexto } from "./useApp";
import { login as loginApi, registro as registroApi } from "../api/authApi";
import { obtenerProducto } from "../api/productosApi";
import {
  obtenerPerfil,
  actualizarPerfil as actualizarPerfilApi,
} from "../api/perfilApi";
import { getToken, guardarToken, cerrarSesion } from "../auth/auth";

const STORAGE_CARRITO = "carrito";
const STORAGE_USUARIOS = "pasteleria_mil_sabores"; // solo para el recuperar legacy

// El JWT trae el claim "rol" (JwtService: Map.of("rol", rol.name())).
// Esto es SOLO para la UI; la autorización real la hace el back.
function rolDelToken() {
  const token = getToken();
  if (!token) return null;
  try {
    let base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    base64 += "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(base64)).rol || null;
  } catch {
    return null;
  }
}

function normalizarPerfil(perfil) {
  const esAdmin = rolDelToken() === "ADMIN";
  return {
    ...perfil,
    isAdmin: esAdmin,
    esAdmin,
    fechaNacUsuario: perfil?.fechaNacUsuario
      ? String(perfil.fechaNacUsuario).slice(0, 10)
      : null,
  };
}

export function AppProvider({ children }) {
  const [productos, setProductos] = useState(productosIniciales);
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
  const [authLoading, setAuthLoading] = useState(Boolean(getToken()));
  const [perfilError, setPerfilError] = useState(null);

  const [productosLoading, setProductosLoading] = useState(true);
  const [productosError, setProductosError] = useState(null);

  // El catalogo se hidrata desde el back. Los mocks quedan como valor inicial
  // para que la tienda no este vacia mientras carga (y para los tests).
  useEffect(() => {
    let activo = true;
    (async () => {
      try {
        const datos = await obtenerProducto();
        if (activo) setProductos(datos);
      } catch (error) {
        if (activo) setProductosError(error.message || "No se pudieron cargar los productos");
      } finally {
        if (activo) setProductosLoading(false);
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  // Hidratar la sesión al recargar: si hay token, pedimos el perfil real.
  useEffect(() => {
    let activo = true;
    (async () => {
      if (!getToken()) {
        if (activo) setAuthLoading(false);
        return;
      }
      try {
        const perfil = await obtenerPerfil();
        if (activo) setCurrentUser(normalizarPerfil(perfil));
      } catch {
        if (activo) {
          cerrarSesion();
          setCurrentUser(null);
        }
      } finally {
        if (activo) setAuthLoading(false);
      }
    })();
    return () => {
      activo = false;
    };
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
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.codigo === codigo) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0
              ? { ...item, cantidad: nuevaCantidad }
              : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalCarrito = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );
  const totalUnidades = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const login = async (correo, password) => {
    setAuthLoading(true);
    setPerfilError(null);
    try {
      const respuesta = await loginApi(correo, password);
      guardarToken(respuesta.token);

      const perfil = await obtenerPerfil();
      const usuario = normalizarPerfil(perfil);
      setCurrentUser(usuario);

      return { success: true, isAdmin: usuario.isAdmin, user: usuario };
    } catch (error) {
      cerrarSesion();
      setCurrentUser(null);
      return {
        success: false,
        message: error.message || "Error en las credenciales",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (nuevoUsuario) => {
    setPerfilError(null);
    try {
      const respuesta = await registroApi(nuevoUsuario);
      guardarToken(respuesta.token);

      const perfil = await obtenerPerfil();
      const usuario = normalizarPerfil(perfil);
      setCurrentUser(usuario);

      const nuevosClientes = [
        ...clientes,
        {
          nombre: `${usuario.nombreUsuario} ${usuario.apellidoUsuario}`,
          correo: usuario.correoUsuario,
        },
      ];
      setClientes(nuevosClientes);
      localStorage.setItem("clientes", JSON.stringify(nuevosClientes));

      return { success: true, isAdmin: usuario.isAdmin, user: usuario };
    } catch (error) {
      return {
        success: false,
        message: error.message || "No se pudo completar el registro",
      };
    }
  };

  const guardarPerfil = async (datos) => {
    setPerfilError(null);
    try {
      const perfil = await actualizarPerfilApi(datos);
      const usuario = normalizarPerfil(perfil);
      setCurrentUser(usuario);
      return { success: true, user: usuario };
    } catch (error) {
      const mensaje = error.message || "No se pudo guardar el perfil";
      setPerfilError(mensaje);
      return { success: false, message: mensaje };
    }
  };

  // Legacy: lo dejamos para no romper ModalRecuperar ni sus tests.
  const recuperarPassword = (correo) => {
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_USUARIOS)) || [];
    const usuario = usuarios.find((u) => u.correo === correo);
    if (usuario) {
      return { success: true, password: usuario.password };
    }
    return {
      success: false,
      message: "Este correo no se encuentra registrado en Pasteleria Mil Sabores",
    };
  };

  const logout = () => {
    cerrarSesion();
    setCurrentUser(null);
    setPerfilError(null);
  };

  return (
    <Contexto.Provider
      value={{
        productos,
        productosLoading,
        productosError,
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
        authLoading,
        perfilError,
        login,
        register,
        actualizarPerfil: guardarPerfil,
        recuperarPassword,
        logout,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}