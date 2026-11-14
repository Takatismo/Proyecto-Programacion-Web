function mostrarEstadoLocal() {
    const etiqueta = document.querySelector("#estadoLocal");

    const ahora = new Date();
    const diaSemana = ahora.getDay();    
    const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();

    const salonAbierto = minutosActuales >= 450 && minutosActuales < 1290;

    const esFinDeSemana = diaSemana === 0 || diaSemana === 6;
    let terrazaAbierta;
    if (esFinDeSemana) {
        terrazaAbierta = minutosActuales >= 450 && minutosActuales < 1260;
    } else {
        terrazaAbierta = minutosActuales >= 1020 && minutosActuales < 1260;
    }

    if (salonAbierto) {
        etiqueta.textContent = "● Abierto ahora · Salón hasta las 9:30 PM";
        etiqueta.className = "estado-local abierto";
    } else {
        etiqueta.textContent = "● Cerrado · Abrimos a las 7:30 AM";
        etiqueta.className = "estado-local cerrado";
    }

    console.log(`Salón abierto: ${salonAbierto} | Terraza abierta: ${terrazaAbierta}`);
}
mostrarEstadoLocal();


const btnTema = document.querySelector("#btnTema");

btnTema.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");

    const esOscuro = document.body.classList.contains("modo-oscuro");
    if (esOscuro) {
        btnTema.textContent = "Modo claro";
    } else {
        btnTema.textContent = "Modo oscuro";
    }
    console.log(`Modo oscuro activo: ${esOscuro}`);
});
