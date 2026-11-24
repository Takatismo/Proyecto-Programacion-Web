
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [modoOscuro, setModoOscuro] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [faqAbierto, setFaqAbierto] = useState(null)
  const [estadoLocal, setEstadoLocal] = useState('')
  const [mostrarBotonInicio, setMostrarBotonInicio] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [mensajeBusqueda, setMensajeBusqueda] = useState('')
  const [saludo, setSaludo] = useState('')
  const [mostrarSaludo, setMostrarSaludo] = useState(false)
  const [modalReserva, setModalReserva] = useState(null)

  const [reserva, setReserva] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: '',
    lugar: ''
  })

  const [calificacion, setCalificacion] = useState(0)
  const [comentario, setComentario] = useState('')
  const [mensajeResena, setMensajeResena] = useState('')

  const [resenas, setResenas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('resenasMasseria')) || []
    } catch {
      return []
    }
  })

  const productos = [
    {
      nombre: 'Cafés',
      imagen: '/imagenes/calientecafe.jpg',
      descripcion: 'Una taza para empezar bien el día.'
    },
    {
      nombre: 'Pasteles',
      imagen: '/imagenes/pasteles.jpg',
      descripcion: 'Tortas y porciones para cada antojo.'
    },
    {
      nombre: 'Bocaditos',
      imagen: '/imagenes/bdulcesalado.jpg',
      descripcion: 'Dulces y salados, ideales para compartir.'
    },
    {
      nombre: 'Chocolates',
      imagen: '/imagenes/bonbones.jpg',
      descripcion: 'Bombones y chocolates para regalar.'
    }
  ]

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const preguntas = [
    {
      pregunta: '¿Necesito reservar para ir a La Masseria?',
      respuesta: 'No es necesario, la atención es por orden de llegada. Si prefieres asegurar tu mesa, usa el formulario de reservas con un día de anticipación.'
    },
    {
      pregunta: '¿Cuál es el horario de atención?',
      respuesta: 'El salón atiende todos los días de 7:30 AM a 9:30 PM. La terraza atiende de lunes a viernes de 5:00 PM a 9:00 PM, y sábado y domingo de 7:30 AM a 9:00 PM.'
    },
    {
      pregunta: '¿Para cuántas personas puedo reservar?',
      respuesta: 'Cada reserva admite de 1 a 6 personas. Puedes elegir entre la terraza, el salón 1 o el salón 2.'
    },
    {
      pregunta: '¿Hacen catering y entrega a domicilio?',
      respuesta: 'Sí, preparamos bocaditos dulces y salados para eventos y cumpleaños. Escríbenos por WhatsApp al 912 594 051 con un día de anticipación.'
    },
    {
      pregunta: '¿Dónde están ubicados?',
      respuesta: 'Estamos en Av. Universitaria, Villa El Salvador, Lima.'
    }
  ]

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setReserva(anterior => ({
      ...anterior,
      [name]: value
    }))
  }

  function manejarReserva(evento) {
    evento.preventDefault()

    const fecha = reserva.fecha
      ? reserva.fecha.split('-').reverse().join('/')
      : ''

    let lugarSeleccionado = 'No seleccionado'

    if (reserva.lugar === 'terraza') {
      lugarSeleccionado = 'Terraza'
    } else if (reserva.lugar === 'salon-1') {
      lugarSeleccionado = 'Salón 1'
    } else if (reserva.lugar === 'salon-2') {
      lugarSeleccionado = 'Salón 2'
    }

    setModalReserva({
      nombre: reserva.nombre,
      telefono: reserva.telefono,
      fecha,
      hora: reserva.hora,
      personas: reserva.personas,
      lugar: lugarSeleccionado
    })

    setReserva({
      nombre: '',
      telefono: '',
      fecha: '',
      hora: '',
      personas: '',
      lugar: ''
    })
  }

  function publicarResena(evento) {
    evento.preventDefault()

    if (calificacion === 0 || comentario.trim() === '') {
      setMensajeResena('Selecciona estrellas y escribe tu comentario.')
      return
    }

    const nuevaResena = {
      id: Date.now(),
      estrellas: calificacion,
      comentario: comentario.trim()
    }

    const nuevasResenas = [...resenas, nuevaResena]

    setResenas(nuevasResenas)
    localStorage.setItem('resenasMasseria', JSON.stringify(nuevasResenas))

    setComentario('')
    setCalificacion(0)
    setMensajeResena('¡Gracias! Tu reseña fue publicada.')
  }

  function volverArriba() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function cerrarMenu() {
    setMenuAbierto(false)
  }

  function manejarBusqueda(evento) {
    evento.preventDefault()

    const texto = busqueda.trim()

    if (productosFiltrados.length === 0) {
      setMensajeBusqueda(`No encontramos "${texto}". Prueba con café o pastel.`)
    } else {
      setMensajeBusqueda('')
    }
  }

  useEffect(() => {
    function mostrarEstadoLocal() {
      const ahora = new Date()
      const minutos = ahora.getHours() * 60 + ahora.getMinutes()
      const apertura = 7 * 60 + 30
      const cierre = 21 * 60 + 30

      if (minutos >= apertura && minutos < cierre) {
        setEstadoLocal('ABIERTO AHORA : Salón hasta las 9:30 PM')
      } else {
        setEstadoLocal('CERRADO : Abrimos a las 7:30 AM')
      }
    }

    function controlarScroll() {
      setMostrarBotonInicio(window.scrollY > 200)
    }

    mostrarEstadoLocal()

    const intervalo = setInterval(mostrarEstadoLocal, 60000)
    window.addEventListener('scroll', controlarScroll)

    return () => {
      clearInterval(intervalo)
      window.removeEventListener('scroll', controlarScroll)
    }
  }, [])

  useEffect(() => {
    const hora = new Date().getHours()

    if (hora >= 5 && hora < 12) {
      setSaludo('Buenos días, ¿un cafecito para empezar?')
    } else if (hora >= 12 && hora < 19) {
      setSaludo('Buenas tardes, ¡hora de un pastel!')
    } else {
      setSaludo('Buenas noches, pásate por la terraza')
    }

    const mostrar = setTimeout(() => {
      setMostrarSaludo(true)
    }, 1500)

    const ocultar = setTimeout(() => {
      setMostrarSaludo(false)
    }, 7000)

    return () => {
      clearTimeout(mostrar)
      clearTimeout(ocultar)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modo-oscuro', modoOscuro)

    return () => {
      document.body.classList.remove('modo-oscuro')
    }
  }, [modoOscuro])

  useEffect(() => {
    document.body.classList.toggle('menu-abierto', menuAbierto)

    return () => {
      document.body.classList.remove('menu-abierto')
    }
  }, [menuAbierto])

  useEffect(() => {
    document.body.classList.toggle('modal-abierto', Boolean(modalReserva))

    return () => {
      document.body.classList.remove('modal-abierto')
    }
  }, [modalReserva])

  useEffect(() => {
    function cerrarConEscape(evento) {
      if (evento.key === 'Escape') {
        setMenuAbierto(false)
        setModalReserva(null)
      }
    }

    function controlarTamano() {
      if (window.innerWidth > 768) {
        setMenuAbierto(false)
      }
    }

    window.addEventListener('keydown', cerrarConEscape)
    window.addEventListener('resize', controlarTamano)

    return () => {
      window.removeEventListener('keydown', cerrarConEscape)
      window.removeEventListener('resize', controlarTamano)
    }
  }, [])

  return (
    <>
      <header>
        <div className="container-hero">
          <div className="container hero">

            <div className="customer-support">
              <i className="fa-solid fa-headset"></i>

              <div className="content-customer-support">
                <span className="text">Soporte al cliente</span>
                <span className="number">999-885-082</span>
              </div>
            </div>

            <div className="container-logo">
              <a href="/">
                <img
                  className="logo"
                  src="/imagenes/logo.jpg"
                  alt="Logo La Masseria"
                />
              </a>

              <div className="texto-logo">
                <h1>LA MASSERIA</h1>
                <p>Pasteles, bocaditos y café</p>
              </div>
            </div>

            <div className="relleno centrado"></div>

          </div>
        </div>
      </header>

      <div className="container-nav">
        <nav className="navbar container" aria-label="Menú principal">

          <button
            type="button"
            id="btnMenu"
            className={`btn-menu ${menuAbierto ? 'activo' : ''}`}
            aria-expanded={menuAbierto}
            aria-controls="menuPrincipal"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul
            className={`menu ${menuAbierto ? 'activo' : ''}`}
            id="menuPrincipal"
          >
            <li><a href="/" onClick={cerrarMenu}>INICIO</a></li>
            <li><a href="/carta" onClick={cerrarMenu}>CARTA</a></li>
            <li><a href="#reservar" className="btn-reservar" onClick={cerrarMenu}>RESERVAR</a></li>
            <li><a href="#catering" onClick={cerrarMenu}>CONTACTANOS</a></li>
            <li>
              <button
                className="btn-tema"
                id="btnTema"
                type="button"
                onClick={() => setModoOscuro(!modoOscuro)}
              >
                {modoOscuro ? 'Modo claro' : 'Modo oscuro'}
              </button>
            </li>
          </ul>

          <form className="search-form" onSubmit={manejarBusqueda}>
            <input
              type="search"
              id="buscador"
              placeholder="Buscar..."
              value={busqueda}
              onChange={evento => {
                setBusqueda(evento.target.value)
                setMensajeBusqueda('')
              }}
            />

            <button className="btn-search" id="btnBuscar" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

        </nav>
      </div>

      <div
        id="fondoMenu"
        className={`fondo-menu ${menuAbierto ? 'visible' : ''}`}
        onClick={cerrarMenu}
      ></div>

      <div className="contenedor-estado">
        <span
          id="estadoLocal"
          className={`estado-local ${
            estadoLocal.startsWith('ABIERTO') ? 'abierto' : 'cerrado'
          }`}
          role="status"
        >
          {estadoLocal}
        </span>
      </div>

      <main>
        <section id="portada">
          <div className="carrusel">

            <div className="carrusel1">
              <img src="/imagenes/tazacaffe.jpg" alt="" />

              <div className="caja-texto">
                <h2>Pasteles, bocaditos y café recién hechos</h2>
                <p>
                  Ven a disfrutar de nuestros bocaditos dulces y salados,
                  una buena taza de café y un ambiente acogedor.
                </p>
                <a className="boton" href="/carta">Ver carta</a>
              </div>
            </div>

            <div className="carrusel2">
              <img src="/imagenes/bocaditos.jpg" alt="" />

              <div className="caja-texto">
                <h2>Catering para tus eventos</h2>
                <p>
                  Bocaditos dulces y salados con entrega a domicilio.
                  Escríbenos con un día de anticipación.
                </p>
                <a
                  className="boton"
                  href="https://wa.link/osl37h"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pedir por WhatsApp
                </a>
              </div>
            </div>

            <div className="carrusel3">
              <img src="/imagenes/terraza.jpg" alt="" />

              <div className="caja-texto">
                <h2>Disfruta nuestra terraza</h2>
                <p>
                  Lunes a viernes de 5 PM a 9 PM.
                  Sábado y domingo de 7:30 AM a 9 PM.
                </p>
                <a className="boton" href="/carta">Ver Carta</a>
              </div>
            </div>

          </div>
        </section>

        <section id="horarios">
          <h2>HORARIOS DE ATENCION</h2>

          <table>
            <thead>
              <tr>
                <th>Zona</th>
                <th>Días</th>
                <th>Horario</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Salón</td>
                <td>Lunes a domingo</td>
                <td>7:30 AM - 9:30 PM</td>
              </tr>

              <tr>
                <td>Terraza</td>
                <td>Lunes a viernes</td>
                <td>5:00 PM - 9:00 PM</td>
              </tr>

              <tr>
                <td>Terraza</td>
                <td>Sábado y domingo</td>
                <td>7:30 AM - 9:00 PM</td>
              </tr>
            </tbody>
          </table>

          <p className="nota">
            No necesitas reservar, la atención es por orden de llegada.
            Si prefieres asegurar tu mesa, usa el formulario de reservas.
          </p>
        </section>

        <section id="pizarra">
          <h2>Menú del día</h2>

          <div className="pizarra">
            <p id="textoPizarra"></p>
            <span className="cursor-tiza"></span>
          </div>
        </section>

        <section id="productos">
          <h2>LO QUE OFRECEMOS</h2>

          <div className="productos">
            {productosFiltrados.map(producto => (
              <article className="txt-produ" key={producto.nombre}>
                <img src={producto.imagen} alt="" />
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
              </article>
            ))}
          </div>

          <p id="sinResultados" className="sin-resultados">
            {productosFiltrados.length === 0
              ? `No encontramos "${busqueda}". Prueba con café o pastel.`
              : mensajeBusqueda}
          </p>
        </section>

        <section id="reservar" className="reservas">
          <div className="container-reservas">

            <h2>Reserva tu mesa</h2>

            <p>
              Completa el formulario y reserva tu espacio en La Masseria.
              <br />
              Realiza tu reserva con un día de anticipación y llega antes de las 7:00 p. m.
              <br />
              ¡Te esperamos para disfrutar de una gran experiencia!
            </p>

            <form className="form-reserva" onSubmit={manejarReserva}>

              <div className="campo">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingresa tu nombre"
                  value={reserva.nombre}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Ej. 987654321"
                  value={reserva.telefono}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={reserva.fecha}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="hora">Hora</label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  value={reserva.hora}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="personas">Número de personas</label>

                <select
                  id="personas"
                  name="personas"
                  value={reserva.personas}
                  onChange={manejarCambio}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="1">1 persona</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                  <option value="5">5 personas</option>
                  <option value="6">6 personas</option>
                </select>
              </div>

              <div className="lugares">
                <h3 className="lugares-titulo">Seleccionar el lugar:</h3>

                <div className="lugares-lista">

                  <label className="lugar">
                    <input
                      type="radio"
                      name="lugar"
                      value="terraza"
                      checked={reserva.lugar === 'terraza'}
                      onChange={manejarCambio}
                    />
                    <img src="/imagenes/azotea.jpg" alt="Terraza" />
                    <span>Terraza</span>
                  </label>

                  <label className="lugar">
                    <input
                      type="radio"
                      name="lugar"
                      value="salon-2"
                      checked={reserva.lugar === 'salon-2'}
                      onChange={manejarCambio}
                    />
                    <img src="/imagenes/salon-2.jpg" alt="Salón 2" />
                    <span>Salón 2</span>
                  </label>

                  <label className="lugar">
                    <input
                      type="radio"
                      name="lugar"
                      value="salon-1"
                      checked={reserva.lugar === 'salon-1'}
                      onChange={manejarCambio}
                    />
                    <img src="/imagenes/salon-1.jpg" alt="Salón 1" />
                    <span>Salón 1</span>
                  </label>

                </div>
              </div>

              <button type="submit" className="btn-reserva">
                RESERVAR
              </button>

            </form>
          </div>
        </section>

        <section id="faq">
          <h2>PREGUNTAS FRECUENTES</h2>

          <div className="faq-lista">
            {preguntas.map((item, indice) => (
              <div
                className={`faq-item ${faqAbierto === indice ? 'abierto' : ''}`}
                key={indice}
              >
                <button
                  className="faq-pregunta"
                  type="button"
                  aria-expanded={faqAbierto === indice}
                  onClick={() =>
                    setFaqAbierto(faqAbierto === indice ? null : indice)
                  }
                >
                  {item.pregunta}
                  <span className="faq-icono" aria-hidden="true">
                    {faqAbierto === indice ? '−' : '+'}
                  </span>
                </button>

                <div className="faq-respuesta">
                  <div className="faq-respuesta-interior">
                    <p>{item.respuesta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="catering">
          <h2>CATERING PARA TUS EVENTOS</h2>

          <p>
            Si tienes un evento o cumpleaños, también hacemos servicio de catering
            con variedad de bocaditos dulces y salados y entrega a domicilio.
          </p>

          <p>
            Escríbenos por WhatsApp al <strong>912 594 051</strong>
            con un día de anticipación.
          </p>

          <a className="boton" href="https://wa.link/osl37h">
            Más información
          </a>
        </section>

        <section id="calificacion">
          <h3>Califica nuestra atención</h3>

          <form onSubmit={publicarResena}>
            <p>
              {calificacion === 0
                ? 'Selecciona tu calificación'
                : `Tu calificación: ${calificacion} de 5 estrellas`}
            </p>

            <div className="estrellas">
              {[1, 2, 3, 4, 5].map(numero => (
                <button
                  key={numero}
                  type="button"
                  className={numero <= calificacion ? 'seleccionada' : ''}
                  onClick={() => setCalificacion(numero)}
                  aria-label={`${numero} estrellas`}
                >
                  ★
                </button>
              ))}
            </div>

            <label htmlFor="comentario">Tu comentario:</label>

            <textarea
              id="comentario"
              placeholder="Cuéntanos tu experiencia en La Masseria..."
              value={comentario}
              onChange={evento => setComentario(evento.target.value)}
              required
            />

            <button type="submit" className="boton">
              Publicar reseña
            </button>

            {mensajeResena && <p role="status">{mensajeResena}</p>}
          </form>

          <div className="lista-resenas">
            <h3>Opiniones de nuestros clientes</h3>

            {resenas.map(resena => (
              <article key={resena.id}>
                <p className="estrellas-publicadas">
                  {'★'.repeat(resena.estrellas)}
                  {'☆'.repeat(5 - resena.estrellas)}
                </p>
                <p>{resena.comentario}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>
          La Masseria
          <br />
          Av. Universitaria, Villa El Salvador, Lima
          <br />
          Teléfono: (01) 734 9549 | WhatsApp: 912 594 051
        </p>

        <p>
          Síguenos en Instagram:{' '}
          <a
            href="https://www.instagram.com/lamasseria_/"
            target="_blank"
            rel="noreferrer"
          >
            @lamasseria_
          </a>
        </p>

        <p>© 2026 La Masseria. Todos los derechos reservados.</p>
      </footer>

      <div
        id="contenedorSaludo"
        className={mostrarSaludo ? 'visible' : ''}
      >
        <p id="saludo">{saludo}</p>
      </div>

      {modalReserva && (
        <div
          className="modal-fondo activo"
          onClick={() => setModalReserva(null)}
        >
          <div
            className="modal-caja"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-reserva"
            onClick={evento => evento.stopPropagation()}
          >
            <button
              type="button"
              className="modal-cerrar"
              aria-label="Cerrar"
              onClick={() => setModalReserva(null)}
            >
              ×
            </button>

            <h2 id="titulo-reserva">¡Reserva recibida!</h2>

            <ul className="modal-lista">
              <li><strong>Nombre:</strong> {modalReserva.nombre}</li>
              <li><strong>Teléfono:</strong> {modalReserva.telefono}</li>
              <li><strong>Fecha:</strong> {modalReserva.fecha}</li>
              <li><strong>Hora:</strong> {modalReserva.hora}</li>
              <li><strong>Personas:</strong> {modalReserva.personas}</li>
              <li><strong>Lugar:</strong> {modalReserva.lugar}</li>
            </ul>

            <button
              type="button"
              className="boton"
              onClick={() => setModalReserva(null)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {mostrarBotonInicio && (
        <button
          id="botonInicio"
          type="button"
          onClick={volverArriba}
          aria-label="Volver al inicio"
          style={{ display: 'block' }}
        >
          ↑
        </button>
      )}
    </>
  )
}

export default App
