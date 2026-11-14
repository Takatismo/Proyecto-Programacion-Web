function mostrarEstadoLocal() {
    const etiqueta = document.getElementById("estadoLocal");

    const ahora = new Date();
    const diaSemana = ahora.getDay();                 
    const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();

    const salonAbierto = minutosActuales >= 450 && minutosActuales < 1290;

    const esFinDeSemana = diaSemana === 0 || diaSemana === 6;
    const terrazaAbierta = esFinDeSemana
        ? (minutosActuales >= 450 && minutosActuales < 1260)
        : (minutosActuales >= 1020 && minutosActuales < 1260);

    etiqueta.textContent = salonAbierto
        ? "● Abierto ahora · Salón hasta las 9:30 PM"
        : "● Cerrado · Abrimos a las 7:30 AM";
    etiqueta.className = salonAbierto ? "estado-local abierto" : "estado-local cerrado";

    console.log(`Salón abierto: ${salonAbierto} | Terraza abierta: ${terrazaAbierta}`);
}

mostrarEstadoLocal();
