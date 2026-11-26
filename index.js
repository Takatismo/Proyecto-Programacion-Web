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

    setTimeout(() => {
        cajaSaludo.classList.add("visible");
    }, 1500);

    setTimeout(() => {
        cajaSaludo.classList.remove("visible");
    }, 7000);
}

mostrarSaludo();

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
        
        const texto =
            `Hola, quiero reservar en La Masseria:\n` +
            `Nombre: ${nombre}\n` +
            `Teléfono: ${telefono}\n` +
            `Fecha: ${fecha}\n` +
            `Hora: ${hora}\n` +
            `Personas: ${personas}\n` +
            `Lugar: ${lugar}`;
        const enlace = `https://wa.me/51912594051?text=${encodeURIComponent(texto)}`;

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
            <div class="modal-botones">
            <button type="button" class="boton" data-cerrar>Aceptar</button>
            <a class="boton boton-wsp" href="${enlace}" target="_blank" rel="noopener" data-cerrar>
                Reservar por WhatsApp
            </a>
            </div>`);

        console.log(`Reserva: ${nombre} | ${fecha} ${hora} | ${personas} personas | ${lugar}`);
        formReserva.reset();
    });
}