import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DetalleProducto from "./pages/DetalleProducto";
import Dashboard from "./pages/Dashboard";
import RutaAdmin from "./components/RutaAdmin";
import Perfil from "./pages/Perfil";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/producto/:codigo",
    element: (
      <Layout>
        <DetalleProducto />
      </Layout>
    ),
  },
  {
  path: "/perfil",
  element: (
    <Layout>
      <Perfil />
    </Layout>
  ),
},
  {
    path: "/dashboard",
    element: (
      <Layout>
        <RutaAdmin>
          <Dashboard />
        </RutaAdmin>
      </Layout>
    ),
  },
]);
