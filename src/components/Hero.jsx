
export default function Hero(){

    return (
    <>
    <section className="hero py-4">
      <div className="container seccion-hero">
        <div className="row align-items-center">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img
              src="/img/logo.png"
              alt="Logo Pastelería Mil Sabores"
              className="img-fluid"
              style={{ maxHeight: "450px" }}
            />
          </div>
          <div className="col-md-6">
            <h1>Pastelería Mil Sabores</h1>
            <p>
              Pastelería 1000 Sabores celebra su 50 aniversario como un
              referente en la repostería chilena. Famosa por su participación
              en un récord Guinness en 1995, cuando colaboró en la creación de
              la torta más grande del mundo, la pastelería busca renovar su
              sistema de ventas online para ofrecer una experiencia de compra
              moderna y accesible para sus clientes.
            </p>

            <button onClick={() => scrollTo("catalogo")} className="btn btn-custom btn-hero">
              Ver catálogo
            </button>
            <button onClick={() => scrollTo("nosotros")} className="btn btn-custom btn-hero">
              Sobre nosotros
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
    )
}
