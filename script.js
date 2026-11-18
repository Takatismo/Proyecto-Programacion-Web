function escaparHTML(texto) {
    const caja = document.createElement("div");
    caja.textContent = texto;
    return caja.innerHTML.replaceAll('"', "&quot;");
}

/* ---------- 1. Estado abierto / cerrado ---------- */
function mostrarEstadoLocal() {
    const etiqueta = document.querySelector("#estadoLocal");
    if (!etiqueta) return;

    const ahora = new Date();
    const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();

    const salonAbierto = minutosActuales >= 450 && minutosActuales < 1290;

    if (salonAbierto) {
        etiqueta.textContent = "ABIERTO AHORA · Salón hasta las 9:30 PM";
        etiqueta.className = "estado-local abierto";
    } else {
        etiqueta.textContent = "CERRADO · Abrimos a las 7:30 AM";
        etiqueta.className = "estado-local cerrado";
    }

    console.log(`Salón abierto: ${salonAbierto}`);
}
mostrarEstadoLocal();

/* ---------- 2. Modo oscuro / claro ---------- */
const btnTema = document.querySelector("#btnTema");

if (btnTema) {
    // Sincroniza el texto inicial con el estado real
    if (document.body.classList.contains("modo-oscuro")) {
        btnTema.textContent = "Modo oscuro";
    } else {
        btnTema.textContent = "Modo claro";
    }

    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("modo-oscuro");

        const esOscuro = document.body.classList.contains("modo-oscuro");
        btnTema.textContent = esOscuro ? "Modo claro" : "Modo oscuro";
        console.log(`Modo oscuro activo: ${esOscuro}`);
    });
}

/// mi parte :v//
const btnMenu = document.querySelector("#btnMenu");
const menuPrincipal = document.querySelector("#menuPrincipal");
const fondoMenu = document.querySelector("#fondoMenu");

function abrirMenu() {
    menuPrincipal.classList.add("activo");
    fondoMenu.classList.add("visible");
    btnMenu.classList.add("activo");
    btnMenu.setAttribute("aria-expanded", "true");
    btnMenu.setAttribute("aria-label", "Cerrar menú");
    document.body.classList.add("menu-abierto");
}

function cerrarMenu() {
    menuPrincipal.classList.remove("activo");
    fondoMenu.classList.remove("visible");
    btnMenu.classList.remove("activo");
    btnMenu.setAttribute("aria-expanded", "false");
    btnMenu.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-abierto");
}

btnMenu.addEventListener("click", () => {
    if (menuPrincipal.classList.contains("activo")) {
        cerrarMenu();
    } else {
        abrirMenu();
    }
});

menuPrincipal.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
});

fondoMenu.addEventListener("click", cerrarMenu);

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        cerrarMenu();
    }
});

const modalFondo = document.createElement("div");
modalFondo.className = "modal-fondo";
modalFondo.setAttribute("aria-hidden", "true");
modalFondo.innerHTML = `
    <div class="modal-caja" role="dialog" aria-modal="true" aria-labelledby="modalTitulo">
        <button type="button" class="modal-cerrar" data-cerrar aria-label="Cerrar ventana">&times;</button>
        <div class="modal-contenido"></div>
    </div>`;
document.body.appendChild(modalFondo);

const modalCaja = modalFondo.querySelector(".modal-caja");
const modalContenido = modalFondo.querySelector(".modal-contenido");
const modalCerrar = modalFondo.querySelector(".modal-cerrar");

let elementoQueAbrio = null;

function abrirModal(html) {
    elementoQueAbrio = document.activeElement;
    modalContenido.innerHTML = html;
    modalFondo.classList.add("activo");
    modalFondo.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");
    modalCerrar.focus();
}

function cerrarModal() {
    if (!modalFondo.classList.contains("activo")) {
        return;
    }
    modalFondo.classList.remove("activo");
    modalFondo.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-abierto");
    if (elementoQueAbrio) {
        elementoQueAbrio.focus();
        elementoQueAbrio = null;
    }
}

modalFondo.addEventListener("click", (e) => {
    if (e.target === modalFondo || e.target.closest("[data-cerrar]")) {
        cerrarModal();
    }
});

function atraparFoco(e) {
    const lista = modalCaja.querySelectorAll("button, a[href], input, select, textarea");
    const primero = lista[0];
    const ultimo = lista[lista.length - 1];

    if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
    }
}

document.addEventListener("keydown", (e) => {
    const modalAbierto = modalFondo.classList.contains("activo");

    if (e.key === "Escape") {
        if (modalAbierto) {
            cerrarModal();
        } else if (menuPrincipal.classList.contains("activo")) {
            cerrarMenu();
            btnMenu.focus();
        }
    }

    if (e.key === "Tab" && modalAbierto) {
        atraparFoco(e);
    }
});

const zonaCarta = document.querySelector(".carta");

if (zonaCarta) {
    zonaCarta.querySelectorAll(".productos > div").forEach((tarjeta) => {
        tarjeta.setAttribute("tabindex", "0");
        tarjeta.setAttribute("role", "button");
    });

    function abrirDetalle(tarjeta) {
        const imagen = tarjeta.querySelector("img");
        const nombre = tarjeta.querySelector("strong").textContent;
        const descripcion = tarjeta.querySelector("p").textContent;
        const precio = tarjeta.querySelector("span").textContent;

        abrirModal(`
            <img src="${escaparHTML(imagen.getAttribute("src"))}" alt="${escaparHTML(imagen.alt)}">
            <h2 id="modalTitulo">${escaparHTML(nombre)}</h2>
            <p>${escaparHTML(descripcion)}</p>
            <p class="modal-precio">${escaparHTML(precio)}</p>`);
    }

    zonaCarta.addEventListener("click", (e) => {
        const tarjeta = e.target.closest(".productos > div");
        if (tarjeta) {
            abrirDetalle(tarjeta);
        }
    });

    zonaCarta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            const tarjeta = e.target.closest(".productos > div");
            if (tarjeta) {
                e.preventDefault();
                abrirDetalle(tarjeta);
            }
        }
    });
}
