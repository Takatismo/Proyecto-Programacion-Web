
import { useState, useEffect, useRef } from 'react'
import './Carta.css'

function Carta() {
    const [modoOscuro, setModoOscuro] = useState(false)
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [estadoLocal, setEstadoLocal] = useState('')
    const [carrito, setCarrito] = useState([])
    const [carritoAbierto, setCarritoAbierto] = useState(false)

    const modalCerrarRef = useRef(null)
    const modalCajaRef = useRef(null)
    const elementoQueAbrioRef = useRef(null)

    // CONTROLAR HORARIO DEL LOCAL
    useEffect(() => {
        function actualizarEstado() {
            const ahora = new Date()
            const minutos = ahora.getHours() * 60 + ahora.getMinutes()
            const abierto = minutos >= 450 && minutos < 1290

            setEstadoLocal(
                abierto
                    ? 'ABIERTO AHORA : Salón hasta las 9:30 PM'
                    : 'CERRADO : Abrimos a las 7:30 AM'
            )
        }

        actualizarEstado()
        const intervalo = setInterval(actualizarEstado, 60000)

        return () => clearInterval(intervalo)
    }, [])

    // MODO OSCURO
    useEffect(() => {
        document.body.classList.toggle('modo-oscuro', modoOscuro)

        return () => {
            document.body.classList.remove('modo-oscuro')
        }
    }, [modoOscuro])

    // MENÚ RESPONSIVE
    useEffect(() => {
        document.body.classList.toggle('menu-abierto', menuAbierto)

        function controlarTamaño() {
            if (window.innerWidth > 768) {
                setMenuAbierto(false)
            }
        }

        window.addEventListener('resize', controlarTamaño)

        return () => {
            window.removeEventListener('resize', controlarTamaño)
            document.body.classList.remove('menu-abierto')
        }
    }, [menuAbierto])

    // CONTROL DEL MODAL DE PRODUCTOS
    useEffect(() => {
        document.body.classList.toggle(
            'modal-abierto',
            Boolean(productoSeleccionado)
        )

        if (!productoSeleccionado) return

        modalCerrarRef.current?.focus()

        function controlarTeclado(evento) {
            if (evento.key === 'Escape') {
                setProductoSeleccionado(null)
            }

            if (evento.key === 'Tab') {
                const elementos = modalCajaRef.current?.querySelectorAll(
                    'button, a[href], input, select, textarea'
                )

                if (!elementos?.length) return

                const primero = elementos[0]
                const ultimo = elementos[elementos.length - 1]

                if (evento.shiftKey && document.activeElement === primero) {
                    evento.preventDefault()
                    ultimo.focus()
                } else if (!evento.shiftKey && document.activeElement === ultimo) {
                    evento.preventDefault()
                    primero.focus()
                }
            }
        }

        document.addEventListener('keydown', controlarTeclado)

        return () => {
            document.removeEventListener('keydown', controlarTeclado)
            document.body.classList.remove('modal-abierto')
            elementoQueAbrioRef.current?.focus()
            elementoQueAbrioRef.current = null
        }
    }, [productoSeleccionado])

    // CERRAR MENÚ Y CARRITO CON ESCAPE
    useEffect(() => {
        function cerrarConEscape(evento) {
            if (evento.key === 'Escape') {
                setMenuAbierto(false)
                setCarritoAbierto(false)
            }
        }

        document.addEventListener('keydown', cerrarConEscape)

        return () => {
            document.removeEventListener('keydown', cerrarConEscape)
        }
    }, [])

    // PRODUCTOS Y CATEGORÍAS
    const categorias = [
        {
            nombre: 'Minisándwiches',
            productos: [
                { imagen: 'butifarra.svg', nombre: 'Butifarra', descripcion: 'Jamón del país con salsa criolla', precio: 'S/ 2.50' },
                { imagen: 'pitipanes.svg', nombre: 'Petitpan con pollo', descripcion: 'Pollo deshilachado con mayonesa de la casa', precio: 'S/ 2.50' },
                { imagen: 'Prosciutto.svg', nombre: 'Prosciutto', descripcion: 'Prosciutto italiano con queso crema', precio: 'S/ 4.00' },
                { imagen: 'Capresse.svg', nombre: 'Caprese', descripcion: 'Mozarella, tomate y albahaca', precio: 'S/ 2.20' }
            ]
        },
        {
            nombre: 'Pasteles salados',
            productos: [
                { imagen: 'Empanada de lomo fino.svg', nombre: 'Empanada de lomo fino', descripcion: 'Empanada rellena de lomo fino', precio: 'S/ 9.00' },
                { imagen: 'empanada de carne.svg', nombre: 'Empanada de carne', descripcion: 'Empanada rellena de carne', precio: 'S/ 8.00' },
                { imagen: 'empanada de pollo2.svg', nombre: 'Empanada de pollo', descripcion: 'Empanada rellena de pollo', precio: 'S/ 8.00' },
                { imagen: 'Empanada de queso.svg', nombre: 'Empanada de queso', descripcion: 'Empanada rellena de queso', precio: 'S/ 7.00' },
                { imagen: 'Empanada mixta.svg', nombre: 'Empanada mixta', descripcion: 'Empanada rellena de carne, pollo y queso', precio: 'S/ 8.00' }
            ]
        },
        {
            nombre: 'Bocaditos',
            subcategorias: [
                {
                    nombre: 'Dulces',
                    productos: [
                        { imagen: 'alfajorcito de miel.svg', nombre: 'Alfajorcito de miel', descripcion: 'Alfajor suave relleno de miel', precio: 'S/ 1.50' },
                        { imagen: 'alfajor de manjar.svg', nombre: 'Alfajorcito de manjar', descripcion: 'Alfajor suave relleno de manjar', precio: 'S/ 1.50' }
                    ]
                },
                {
                    nombre: 'Salados',
                    productos: [
                        { imagen: 'Empanadita de carne.svg', nombre: 'Empanadita de carne', descripcion: 'Mini empanada rellena de carne', precio: 'S/ 1.50' },
                        { imagen: 'Empanadita de pollo.svg', nombre: 'Empanadita de pollo', descripcion: 'Mini empanada rellena de pollo', precio: 'S/ 1.50' }
                    ]
                }
            ]
        },
        {
            nombre: 'Bebidas',
            subcategorias: [
                {
                    nombre: 'Calientes',
                    productos: [
                        { imagen: 'expresso.svg', nombre: 'Café expresso', descripcion: 'Café concentrado, intenso y aromático', precio: 'S/ 6.00' },
                        { imagen: 'Cafe Americano.svg', nombre: 'Café americano', descripcion: 'Espresso con agua caliente', precio: 'S/ 7.00' },
                        { imagen: 'Café con leche.svg', nombre: 'Café con leche', descripcion: 'Café suave con leche caliente', precio: 'S/ 10.00' },
                        { imagen: 'Capuccino.svg', nombre: 'Café cappuccino', descripcion: 'Espresso con leche y espuma', precio: 'S/ 10.00' },
                        { imagen: 'Latte.svg', nombre: 'Café latte', descripcion: 'Espresso con leche vaporizada', precio: 'S/ 10.00' },
                        { imagen: 'Mocca.svg', nombre: 'Café mocaccino', descripcion: 'Espresso con chocolate y leche', precio: 'S/ 11.00' }
                    ]
                },
                {
                    nombre: 'Jugos',
                    productos: [
                        { imagen: 'jugo de papaya.svg', nombre: 'Jugo de papaya', descripcion: 'Jugo natural de papaya', precio: 'S/ 10.00' },
                        { imagen: 'Jugo de piña.svg', nombre: 'Jugo de piña', descripcion: 'Jugo natural de piña', precio: 'S/ 10.00' },
                        { imagen: 'jugo de mango.svg', nombre: 'Jugo de mango', descripcion: 'Jugo natural de mango', precio: 'S/ 10.00' },
                        { imagen: 'jugo de fresa.svg', nombre: 'Jugo de fresa', descripcion: 'Jugo natural de fresa', precio: 'S/ 12.50' }
                    ]
                }
            ]
        },
        {
            nombre: 'Postres',
            productos: [
                { imagen: 'Alfajor con miel.svg', nombre: 'Alfajor con miel', descripcion: 'Alfajor suave relleno de miel', precio: 'S/ 4.00' },
                { imagen: 'Alfajor con manjar blanco.svg', nombre: 'Alfajor con manjar blanco', descripcion: 'Alfajor suave relleno de manjar blanco', precio: 'S/ 4.00' },
                { imagen: 'alfajor de maizena.svg', nombre: 'Alfajor de maizena', descripcion: 'Alfajor delicado de maizena', precio: 'S/ 4.50' },
                { imagen: 'tartaleta de fresa.svg', nombre: 'Tartaleta de fresa', descripcion: 'Tartaleta con crema y fresas', precio: 'S/ 12.50' },
                { imagen: 'Tartaleta de manzana.svg', nombre: 'Tartaleta de manzana', descripcion: 'Tartaleta con manzana caramelizada', precio: 'S/ 13.50' },
                { imagen: 'tartaleta de arandano.svg', nombre: 'Tartaleta de arándano', descripcion: 'Tartaleta con arándanos frescos', precio: 'S/ 15.00' }
            ]
        }
    ]

    // FUNCIONES DEL CARRITO
    function agregarAlCarrito(producto) {
        setCarrito((carritoActual) => {
            const existe = carritoActual.find(
                (item) => item.nombre === producto.nombre
            )

            if (existe) {
                return carritoActual.map((item) =>
                    item.nombre === producto.nombre
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            }

            return [
                ...carritoActual,
                { ...producto, cantidad: 1 }
            ]
        })

        setProductoSeleccionado(null)
        setCarritoAbierto(true)
    }

    function aumentarCantidad(nombre) {
        setCarrito((carritoActual) =>
            carritoActual.map((item) =>
                item.nombre === nombre
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )
        )
    }

    function disminuirCantidad(nombre) {
        setCarrito((carritoActual) =>
            carritoActual
                .map((item) =>
                    item.nombre === nombre
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        )
    }

    function eliminarDelCarrito(nombre) {
        setCarrito((carritoActual) =>
            carritoActual.filter((item) => item.nombre !== nombre)
        )
    }

    function vaciarCarrito() {
        setCarrito([])
    }

    function convertirPrecio(precio) {
        return Number(precio.replace('S/', '').trim())
    }

    function formatoPrecio(cantidad) {
        return `S/ ${cantidad.toFixed(2)}`
    }

    const cantidadProductos = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    )

    const subtotal = carrito.reduce(
        (total, item) =>
            total + convertirPrecio(item.precio) * item.cantidad,
        0
    )

    const igv = subtotal * 0.18
    const total = subtotal + igv

    // MODAL DE PRODUCTOS
    function mostrarProducto(producto) {
        elementoQueAbrioRef.current = document.activeElement
        setProductoSeleccionado(producto)
    }

    function cerrarMenu() {
        setMenuAbierto(false)
    }

    // MOSTRAR PRODUCTOS
    function mostrarProductos(productos) {
        return (
            <div className="productos">
                {productos.map((producto, indice) => (
                    <div
                        key={producto.nombre + indice}
                        onClick={() => mostrarProducto(producto)}
                        onKeyDown={(evento) => {
                            if (
                                evento.key === 'Enter' ||
                                evento.key === ' '
                            ) {
                                evento.preventDefault()
                                mostrarProducto(producto)
                            }
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <img
                            src={`/imagenes/productos/${producto.imagen}`}
                            alt={producto.nombre}
                        />

                        <strong>{producto.nombre}</strong>
                        <p>{producto.descripcion}</p>
                        <span>{producto.precio}</span>

                        <button
                            type="button"
                            className="btn-agregar-carrito"
                            onClick={(evento) => {
                                evento.stopPropagation()
                                agregarAlCarrito(producto)
                            }}
                        >
                            <i className="fa-solid fa-cart-plus"></i>
                            {' '}Agregar
                        </button>
                    </div>
                ))}
            </div>
        )
    }

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

            {/* MENÚ DE NAVEGACIÓN */}
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
                        <li>
                            <a href="/" onClick={cerrarMenu}>INICIO</a>
                        </li>

                        <li>
                            <a href="/carta.html" onClick={cerrarMenu}>CARTA</a>
                        </li>

                        <li>
                            <a href="https://wa.link/osl37h" onClick={cerrarMenu}>
                                CONTACTANOS
                            </a>
                        </li>

                        <li>
                            <a
                                href="/#reservar"
                                className="btn-reservar"
                                onClick={cerrarMenu}
                            >
                                RESERVAR
                            </a>
                        </li>

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

                        <li>
                            <button
                                type="button"
                                className="btn-abrir-carrito"
                                onClick={() => setCarritoAbierto(true)}
                            >
                                <i className="fa-solid fa-cart-shopping"></i>
                                {' '}CARRITO ({cantidadProductos})
                            </button>
                        </li>
                    </ul>

                    <form
                        className="search-form"
                        onSubmit={(evento) => evento.preventDefault()}
                    >
                        <input type="search" placeholder="Buscar..." />

                        <button
                            className="btn-search"
                            id="btnBuscar"
                            type="button"
                        >
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

            {/* ESTADO DEL LOCAL */}
            <div className="contenedor-estado">
                <span
                    id="estadoLocal"
                    className={`estado-local ${
                        estadoLocal.startsWith('ABIERTO')
                            ? 'abierto'
                            : 'cerrado'
                    }`}
                    role="status"
                >
                    {estadoLocal}
                </span>
            </div>

            {/* CARTA */}
            <main>
                <section className="carta">
                    <h2>Nuestra Carta</h2>
                    <p>Descubre nuestras especialidades</p>

                    {categorias.map((categoria) => (
                        <div key={categoria.nombre}>
                            <h3>{categoria.nombre}</h3>

                            {categoria.productos &&
                                mostrarProductos(categoria.productos)}

                            {categoria.subcategorias &&
                                categoria.subcategorias.map((subcategoria) => (
                                    <div key={subcategoria.nombre}>
                                        <h4>{subcategoria.nombre}</h4>
                                        {mostrarProductos(subcategoria.productos)}
                                    </div>
                                ))}
                        </div>
                    ))}
                </section>
            </main>

            {/* FOOTER */}
            <footer>
                <p>
                    La Masseria<br />
                    Av. Universitaria, Villa El Salvador, Lima<br />
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

            {/* MODAL DE PRODUCTOS */}
            {productoSeleccionado && (
                <div
                    className="modal-fondo activo"
                    onClick={() => setProductoSeleccionado(null)}
                    aria-hidden="false"
                >
                    <div
                        className="modal-caja"
                        ref={modalCajaRef}
                        onClick={(evento) => evento.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modalTitulo"
                    >
                        <button
                            type="button"
                            className="modal-cerrar"
                            ref={modalCerrarRef}
                            onClick={() => setProductoSeleccionado(null)}
                            aria-label="Cerrar ventana"
                        >
                            ×
                        </button>

                        <div className="modal-contenido">
                            <img
                                src={`/imagenes/productos/${productoSeleccionado.imagen}`}
                                alt={productoSeleccionado.nombre}
                            />

                            <h2 id="modalTitulo">
                                {productoSeleccionado.nombre}
                            </h2>

                            <p>{productoSeleccionado.descripcion}</p>

                            <p className="modal-precio">
                                {productoSeleccionado.precio}
                            </p>

                            <button
                                type="button"
                                className="btn-agregar-carrito"
                                onClick={() => agregarAlCarrito(productoSeleccionado)}
                            >
                                <i className="fa-solid fa-cart-plus"></i>
                                {' '}Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CARRITO DE COMPRAS */}
            {carritoAbierto && (
                <div
                    className="carrito-fondo"
                    onClick={() => setCarritoAbierto(false)}
                >
                    <div
                        className="carrito-panel"
                        onClick={(evento) => evento.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="tituloCarrito"
                    >
                        <div className="carrito-encabezado">
                            <h2 id="tituloCarrito">
                                <i className="fa-solid fa-cart-shopping"></i>
                                {' '}Mi carrito
                            </h2>

                            <button
                                type="button"
                                className="carrito-cerrar"
                                onClick={() => setCarritoAbierto(false)}
                                aria-label="Cerrar carrito"
                            >
                                ×
                            </button>
                        </div>

                        {carrito.length === 0 ? (
                            <div className="carrito-vacio">
                                <i className="fa-solid fa-cart-shopping carrito-icono-vacio"></i>

                                <h3>Tu carrito está vacío</h3>
                                <p>¡Agrega tus productos favoritos!</p>

                                <button
                                    type="button"
                                    className="btn-agregar-carrito"
                                    onClick={() => setCarritoAbierto(false)}
                                >
                                    Ver carta
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="carrito-lista">
                                    {carrito.map((item) => (
                                        <div
                                            key={item.nombre}
                                            className="carrito-producto"
                                        >
                                            <img
                                                src={`/imagenes/productos/${item.imagen}`}
                                                alt={item.nombre}
                                                className="carrito-imagen"
                                            />

                                            <div className="carrito-info">
                                                <h3>{item.nombre}</h3>

                                                <p>
                                                    {formatoPrecio(
                                                        convertirPrecio(item.precio)
                                                    )}
                                                </p>

                                                <div className="carrito-controles">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            disminuirCantidad(item.nombre)
                                                        }
                                                        className="carrito-btn-cantidad"
                                                        aria-label={`Disminuir ${item.nombre}`}
                                                    >
                                                        −
                                                    </button>

                                                    <span>{item.cantidad}</span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            aumentarCantidad(item.nombre)
                                                        }
                                                        className="carrito-btn-cantidad"
                                                        aria-label={`Aumentar ${item.nombre}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        eliminarDelCarrito(item.nombre)
                                                    }
                                                    className="carrito-eliminar"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>

                                            <strong className="carrito-precio-total">
                                                {formatoPrecio(
                                                    convertirPrecio(item.precio) *
                                                    item.cantidad
                                                )}
                                            </strong>
                                        </div>
                                    ))}
                                </div>

                                <div className="carrito-resumen">
                                    <div className="carrito-linea">
                                        <span>Productos:</span>
                                        <strong>{cantidadProductos}</strong>
                                    </div>

                                    <div className="carrito-linea">
                                        <span>Subtotal:</span>
                                        <strong>{formatoPrecio(subtotal)}</strong>
                                    </div>

                                    <div className="carrito-linea">
                                        <span>IGV (18%):</span>
                                        <strong>{formatoPrecio(igv)}</strong>
                                    </div>

                                    <div className="carrito-total">
                                        <span>TOTAL:</span>
                                        <strong>{formatoPrecio(total)}</strong>
                                    </div>

                                    <div className="carrito-acciones">
                                        <button
                                            type="button"
                                            className="carrito-vaciar"
                                            onClick={vaciarCarrito}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                            {' '}Vaciar carrito
                                        </button>

                                        <button
                                            type="button"
                                            className="carrito-continuar"
                                            onClick={() => {
                                                alert('¡Tu pedido está listo para continuar!')
                                            }}
                                        >
                                            Continuar con el pedido
                                            {' '}<i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Carta
