function mostrarSaludo() {
    const horaActual = new Date().getHours();
    const cajaSaludo = document.querySelector("#contenedorSaludo");
    const saludo = document.querySelector("#saludo");
    
    if (!cajaSaludo || !saludo) return;

    let mensaje;

    if (horaActual < 12) {
        mensaje = "Buenos días, ¿un cafecito para empezar?";
    } else if (horaActual < 19) {
        mensaje = "Buenas tardes, ¡hora de un pastel!";
    } else {
        mensaje = "Buenas noches, pásate por la terraza";
    }

    saludo.textContent = mensaje;

    // Lo hacemos visible a los 1.5 segundos (para que la página cargue primero)
    setTimeout(() => {
        cajaSaludo.classList.add("visible");
    }, 1500);

    // Lo ocultamos a los 7 segundos (dura 5.5 segundos en pantalla)
    setTimeout(() => {
        cajaSaludo.classList.remove("visible");
    }, 7000);
}

mostrarSaludo();


const buscador = document.querySelector("#buscador");
const formBuscador = document.querySelector(".search-form");
const btnBuscar = document.querySelector("#btnBuscar");

// Función para quitar tildes (para que "cafe" encuentre "Cafés")
function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

if (buscador && formBuscador) {
    function filtrarProductos() {
        const texto = quitarTildes(buscador.value.trim());
        const tarjetas = document.querySelectorAll(".txt-produ");
        const aviso = document.querySelector("#sinResultados");
        let coincidencias = 0;

        for (let i = 0; i < tarjetas.length; i++) {
            const nombre = quitarTildes(tarjetas[i].querySelector("h3").textContent);

            if (nombre.includes(texto)) {
                tarjetas[i].style.display = "";
                coincidencias++;
            } else {
                tarjetas[i].style.display = "none";
            }
        }

        if (aviso) {
            if (coincidencias === 0) {
                aviso.textContent = `No encontramos "${buscador.value}". Prueba con café o pastel.`;
                aviso.style.display = "block";
            } else {
                aviso.textContent = "";
                aviso.style.display = "none";
            }
        }
    }

    // Busca mientras escribes
    buscador.addEventListener("input", filtrarProductos);

    // Busca cuando haces clic en la lupa
    if (btnBuscar) {
        btnBuscar.addEventListener("click", (e) => {
            e.preventDefault();
            filtrarProductos();
        });
    }

    // Evita que al presionar Enter se recargue la página
    formBuscador.addEventListener("submit", (e) => {
        e.preventDefault();
        filtrarProductos();
    });
}

const formReserva = document.querySelector(".form-reserva");

if (formReserva) {
    const nombresLugar = {
        "terraza": "Terraza",
        "salon-1": "Salón 1",
        "salon-2": "Salón 2"
    };

    formReserva.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.querySelector("#nombre").value.trim();
        const telefono = document.querySelector("#telefono").value.trim();
        const personas = document.querySelector("#personas").value;
        const hora = document.querySelector("#hora").value;

        const fecha = document.querySelector("#fecha").value.split("-").reverse().join("/");

        const lugarElegido = formReserva.querySelector('input[name="lugar"]:checked');
        const lugar = lugarElegido ? nombresLugar[lugarElegido.value] : "Sin elegir";

        abrirModal(`
            <h2 id="modalTitulo">¡Reserva recibida!</h2>
            <ul class="modal-lista">
                <li><strong>Nombre:</strong> ${escaparHTML(nombre)}</li>
                <li><strong>Teléfono:</strong> ${escaparHTML(telefono)}</li>
                <li><strong>Fecha:</strong> ${escaparHTML(fecha)}</li>
                <li><strong>Hora:</strong> ${escaparHTML(hora)}</li>
                <li><strong>Personas:</strong> ${escaparHTML(personas)}</li>
                <li><strong>Lugar:</strong> ${escaparHTML(lugar)}</li>
            </ul>
            <button type="button" class="boton" data-cerrar>Aceptar</button>`);

        console.log(`Reserva: ${nombre} | ${fecha} ${hora} | ${personas} personas | ${lugar}`);
        formReserva.reset();
    });
}