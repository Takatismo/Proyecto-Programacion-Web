let notas = [];
let continuar = confirm('desea ingresar nota')

while (continuar) {
    let entrada = prompt('Ingrese la nota del estudiante');
    let nota = parseFloat (entrada);

    if (!isNaN(nota) && nota >= 0 && nota <= 20 ) {
        notas.push(nota);
    } else {
        alert ('Nota invalida. Ingrese un valor dentro de 0 y 20.')
    }
}