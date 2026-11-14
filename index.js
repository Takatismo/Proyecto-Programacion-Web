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

function filtrarProductos() {
    const texto = buscador.value.toLowerCase();
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

    if (coincidencias === 0) {
        aviso.textContent = `No encontramos "${texto}". Prueba con café o pastel.`;
    } else {
        aviso.textContent = "";
    }
    console.log(`Búsqueda: "${texto}" | Coincidencias: ${coincidencias}`);
}

buscador.addEventListener("input", filtrarProductos);
formBuscador.addEventListener("submit", (e) => {
    e.preventDefault();    
});
