import React from 'react';
import Hero from '../components/Hero';
import Ofertas from '../components/Ofertas';
import Nosotros from '../components/Nosotros';
import Catalogo from '../components/Catalogo';
export default function Home() {
  return (
    <>
      <Hero />
      <Ofertas />
      <Nosotros />
      <Catalogo />
    </>
  );
}