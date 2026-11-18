function mostrarSaludo() {
    const horaActual = new Date().getHours();
    const saludo = document.querySelector("#saludo");
    let mensaje;

    if (horaActual < 12) {
        mensaje = "Buenos días, ¿un cafecito para empezar?";
    } else if (horaActual < 19) {
        mensaje = "Buenas tardes, ¡hora de un pastel!";
    } else {
        mensaje = "Buenas noches, pásate por la terraza";
    }

    saludo.textContent = mensaje;
    console.log(`Hora actual: ${horaActual} | Mensaje: ${mensaje}`);
}
mostrarSaludo();


const buscador = document.querySelector("#buscador");
const formBuscador = document.querySelector(".search-form");

if (buscador && formBuscador) {
    function filtrarProductos() {
        const texto = buscador.value.toLowerCase().trim();
        const tarjetas = document.querySelectorAll(".txt-produ");
        const aviso = document.querySelector("#sinResultados");
        let coincidencias = 0;

        for (let i = 0; i < tarjetas.length; i++) {
            const nombre = tarjetas[i].querySelector("h3").textContent.toLowerCase();

            if (nombre.includes(texto)) {
                tarjetas[i].style.display = "";
                coincidencias++;
            } else {
                tarjetas[i].style.display = "none";
            }
        }

        if (aviso) {
            aviso.textContent = coincidencias === 0
                ? `No encontramos "${texto}". Prueba con café o pastel.`
                : "";
        }

        console.log(`Búsqueda: "${texto}" | Coincidencias: ${coincidencias}`);
    }

    buscador.addEventListener("input", filtrarProductos);

    formBuscador.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}

const formReserva = document.querySelector(".form-reserva");

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