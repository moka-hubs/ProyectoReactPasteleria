import { AppProvider } from './context/Contexto'
import Footer from './components/Footer'
import NavBar from './components/Navbar'
import { CarritoOffcanvas } from './components/CarritoOffCanvas'
import Home from './pages/Home'
import DetalleProducto from './pages/DetalleProducto'
import Dashboard from './pages/Dashboard'
import RutaAdmin from './components/RutaAdmin'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import ModalLogin from './components/Modales/ModalLogin'
import { ModalAgregado } from './components/Modales/ModalAgregado'
import { RecuperarModal } from './components/Modales/ModalRecuperar'
import { ModalRegistro } from './components/Modales/ModalRegistro'

function ModalLoginConRedireccion() {
  const navigate = useNavigate()
  return <ModalLogin onAdminLogin={() => navigate('/dashboard')}/>
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <NavBar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:codigo" element={<DetalleProducto />} />
          <Route
            path='/dashboard'
            element={
              <RutaAdmin>
                <Dashboard/>
              </RutaAdmin>
            }
          />
        </Routes>

        <Footer />
        <CarritoOffcanvas />
        <ModalAgregado />
        <RecuperarModal />
        <ModalLoginConRedireccion />
        <ModalRegistro/>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App