
const botonInicio = document.createElement("button");

botonInicio.textContent = "↑";
botonInicio.id = "botonInicio";

document.body.appendChild(botonInicio);

window.addEventListener("scroll", function() {
    if (window.scrollY > 200) {
        botonInicio.style.display = "block";
    } else {
        botonInicio.style.display = "none";
    }
});

botonInicio.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


(function() {
    const calificacion = document.createElement("div");
    calificacion.id = "calificacion";

    calificacion.innerHTML = `
        <h3>Califica nuestra atención</h3>
        <div class="estrellas">
            <button data-valor="1">★</button>
            <button data-valor="2">★</button>
            <button data-valor="3">★</button>
            <button data-valor="4">★</button>
            <button data-valor="5">★</button>
        </div>
        <p>Selecciona tu calificación</p>
    `;

    const piePagina = document.querySelector("footer");

    if (piePagina) {
        piePagina.before(calificacion);
    } else {
        document.body.appendChild(calificacion);
    }

    const estrellas = calificacion.querySelectorAll("button");

    estrellas.forEach(function(estrella) {
        estrella.addEventListener("click", function() {
            const valor = Number(estrella.dataset.valor);

            estrellas.forEach(function(item) {
                item.classList.toggle(
                    "seleccionada",
                    Number(item.dataset.valor) <= valor
                );
            });

            calificacion.querySelector("p").textContent =
                "¡Gracias! Tu calificación: " + valor + " de 5 estrellas";
        });
    });
})();
