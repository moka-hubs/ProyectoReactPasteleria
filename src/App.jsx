import { useState } from 'react'
import Hero from './components/Hero'
import Ofertas from './components/Ofertas'
import Nosotros from './components/Nosotros'
import Footer from './components/Footer'
import Catalogo from './components/Catalogo'
import NavBar from './components/Navbar'
function App() {

  return (
    <>
        <NavBar />
        <Hero />
        <Ofertas />
        <Nosotros/>
        <Catalogo/>
        <Footer/>
        

    </>
  )
}

export default App
