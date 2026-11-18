
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

        <p id="mensajeCalificacion">Selecciona tu calificación</p>

        <textarea id="comentarioCliente"
        placeholder="Cuéntanos tu experiencia en La Masseria..."></textarea>

        <button id="publicarResena">Publicar reseña</button>

        <p id="mensajeResena"></p>

        <div id="listaResenas">
            <h3>Opiniones de nuestros clientes</h3>
        </div>
    `;

    const piePagina = document.querySelector("footer");

    if (piePagina) {
        piePagina.before(calificacion);
    } else {
        document.body.appendChild(calificacion);
    }

    let valorSeleccionado = 0;

    const estrellas = calificacion.querySelectorAll(".estrellas button");

    estrellas.forEach(function(estrella) {
        estrella.addEventListener("click", function() {
            valorSeleccionado = Number(estrella.dataset.valor);

            estrellas.forEach(function(item) {
                item.classList.toggle(
                    "seleccionada",
                    Number(item.dataset.valor) <= valorSeleccionado
                );
            });

            document.getElementById("mensajeCalificacion").textContent =
                "Tu calificación: " + valorSeleccionado + " de 5 estrellas";
        });
    });

    let resenas = JSON.parse(localStorage.getItem("resenasMasseria")) || [];

    function mostrarResenas() {
        const lista = document.getElementById("listaResenas");

        lista.innerHTML = "<h3>Opiniones de nuestros clientes</h3>";

        resenas.forEach(function(resena) {
            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-resena";

            const puntuacion = document.createElement("p");
            puntuacion.className = "estrellas-publicadas";
            puntuacion.textContent = "★".repeat(resena.estrellas);

            const comentario = document.createElement("p");
            comentario.textContent = resena.comentario;

            tarjeta.appendChild(puntuacion);
            tarjeta.appendChild(comentario);

            lista.appendChild(tarjeta);
        });
    }

    document.getElementById("publicarResena").addEventListener("click", function() {
        const comentario = document.getElementById("comentarioCliente").value.trim();
        const mensaje = document.getElementById("mensajeResena");

        if (valorSeleccionado === 0 || comentario === "") {
            mensaje.textContent = "Selecciona estrellas y escribe tu comentario.";
            return;
        }

        const nuevaResena = {
            estrellas: valorSeleccionado,
            comentario: comentario
        };

        resenas.push(nuevaResena);

        localStorage.setItem("resenasMasseria", JSON.stringify(resenas));

        mostrarResenas();

        mensaje.textContent = "¡Gracias! Tu reseña fue publicada.";

        document.getElementById("comentarioCliente").value = "";
        document.getElementById("mensajeCalificacion").textContent =
            "Selecciona tu calificación";

        valorSeleccionado = 0;

        estrellas.forEach(function(item) {
            item.classList.remove("seleccionada");
        });
    });

    mostrarResenas();

})();

