

export default function Ofertas(){
    return (
         <>
          <section className="ofertas container">
          <div className="card-oferta row">
            <div className = "text-center">
              <h3>
                Si estas registrado en Pasteleria Mil Sabores puedes acceder a estos excelentes descuentos en tu compra
              </h3>
              <ul>
                <p> Si eres mayor a 50 años obtendras un 50% de descuento en el total de tu compra</p>
              </ul>
              <ul>
                <p>Si al momento de registrarse ocupas el codigo FELICES50 obtendras un 10% de descuento de por vida</p>
              </ul>
              <ul>
                <p>Para cada estudiante de Duoc Uc que se registre con su correo institucional obtendra una torta gratis por su cumpleaños</p>
              </ul>

              <button
                type="button"
                className="btn-oferta"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Inicia Sesión
              </button>

              <button
                type="button"
                className="btn-oferta"
                data-bs-toggle="modal"
                data-bs-target="#registrarModal"
              >
                Registrarse
              </button>

              


              
            </div>
          </div>
        </section>
        </>
    )
       
    }


