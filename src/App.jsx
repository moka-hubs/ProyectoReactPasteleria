import { AppProvider } from './context/Contexto'
import Footer from './components/Footer'
import NavBar from './components/Navbar'
import { CarritoOffcanvas } from './components/CarritoOffCanvas'
import Home from './pages/Home'
import DetalleProducto from './pages/DetalleProducto'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ModalLogin from './components/Modales/ModalLogin'
import { ModalAgregado } from './components/Modales/ModalAgregado'
import { RecuperarModal } from './components/Modales/ModalRecuperar'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <NavBar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:codigo" element={<DetalleProducto />} />
        </Routes>

        <Footer />
        <CarritoOffcanvas />
        <ModalAgregado />
        <RecuperarModal />
        <ModalLogin />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App