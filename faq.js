// faq.js: preguntas frecuentes con acordeón (solo index.html)
// Al hacer clic en una pregunta se abre su respuesta
const itemsFaq = document.querySelectorAll(".faq-item");

function abrirItem(item) {
    item.classList.add("abierto");
    item.querySelector(".faq-pregunta").setAttribute("aria-expanded", "true");
}

function cerrarItem(item) {
    item.classList.remove("abierto");
    item.querySelector(".faq-pregunta").setAttribute("aria-expanded", "false");
}

itemsFaq.forEach(item => {
    const boton = item.querySelector(".faq-pregunta");

    boton.addEventListener("click", () => {
        const estabaAbierto = item.classList.contains("abierto");

    
        itemsFaq.forEach(otro => cerrarItem(otro));

        
        if (!estabaAbierto) {
            abrirItem(item);
        }
    });
});
