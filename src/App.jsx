import { AppProvider } from './context/Contexto'
import Hero from './components/Hero'
import Ofertas from './components/Ofertas'
import Nosotros from './components/Nosotros'
import Footer from './components/Footer'
import Catalogo from './components/Catalogo'
import NavBar from './components/Navbar'
import { CarritoOffcanvas } from './components/CarritoOffCanvas'

function App() {

  return (
    <AppProvider>
      <NavBar />
      <Hero />
      <Ofertas />
      <Nosotros/>
      <Catalogo/>
      <Footer/>
      <CarritoOffcanvas />
    </AppProvider>
  )
}

export default App
