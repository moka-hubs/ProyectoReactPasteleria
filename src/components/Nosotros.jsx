import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Nosotros() {
  const imagenesCarrusel = [
    {
      src: "/carrusel/chef.jpg",
      titulo: "Pasión por la Repostería",
      descripcion: "Maestros pasteleros dedicados a cada detalle artesanal.",
    },
    {
      src: "/carrusel/chefs.jpg",
      titulo: "Nuestro Equipo",
      descripcion: "Manos expertas creando momentos dulces e inolvidables.",
    },
    {
      src: "/carrusel/cumpleanios.jpg",
      titulo: "Celebraciones Especiales",
      descripcion: "Tortas personalizadas para tus mejores momentos.",
    },
    {
      src: "/carrusel/matrimonio.jpg",
      titulo: "Diseños Exclusivos",
      descripcion: "Elegancia y sabor para eventos únicos.",
    },
    {
      src: "/carrusel/piedelimon.jpg",
      titulo: "Recetas Tradicionales",
      descripcion: "Los clásicos de siempre con ingredientes de primera calidad.",
    },
  ];

  return (
    <section className="nosotros" id="nosotros">
      <div className="container seccion-hero">
        <h1 className="text-center mb-4">Sobre nosotros</h1>

        <div className="row justify-content-center mb-5">
          <div className="col-12 col-lg-10">
            <Carousel
              interval={3000}
              pause="hover"
              className="rounded-4 overflow-hidden shadow"
            >
              {imagenesCarrusel.map((item, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={item.src}
                    alt={item.titulo}
                    style={{
                      height: "420px",
                      objectFit: "cover",
                    }}
                  />
                  <Carousel.Caption className="bg-dark bg-opacity-50 rounded-3 p-3 d-none d-md-block">
                    <h3 className="text-white fs-4 m-0">{item.titulo}</h3>
                    <p className="text-white fs-6 m-0">{item.descripcion}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="row align-items-center text-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h3>Nuestra Misión</h3>
            <p>
              Ofrecer una experiencia dulce y memorable a nuestros clientes,
              proporcionando tortas y productos de repostería de alta
              calidad para todas las ocasiones, mientras celebramos nuestras
              raíces históricas y fomentamos la creatividad en la repostería.
            </p>
          </div>
          <div className="col-md-6">
            <h3>Visión</h3>
            <p>
              Convertirnos en la tienda online líder de productos de
              repostería en Chile, conocida por nuestra innovación, calidad
              y el impacto positivo en la comunidad, especialmente en la
              formación de nuevos talentos en gastronomía.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}