import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { CarritoOffcanvas } from "./CarritoOffCanvas";
import ModalLogin from "./Modales/ModalLogin";
import { ModalAgregado } from "./Modales/ModalAgregado";
import { RecuperarModal } from "./Modales/ModalRecuperar";
import { ModalRegistro } from "./Modales/ModalRegistro";

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      {children}
      <Footer />
      <CarritoOffcanvas />
      <ModalAgregado />
      <RecuperarModal />
      <ModalLogin onAdminLogin={() => navigate("/dashboard")} />
      <ModalRegistro />
    </>
  );
}
