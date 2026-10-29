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
    continuar = confirm(desea registrar otra nota)
}

// Calcular promedio de notas del array
let suma = 0;
for (let i = 0; i < notas.length; i++) {
  suma += notas[i];
}
let promedio = suma / notas.length;
alert(`Promedio general: ${promedio.toFixed(2)}`);

// Verificar existencia de nota 20
let pos = notas.indexOf(20);
if (pos !== -1) {
  console.log(`¡Existe nota perfecta en posición ${pos}!`);
}
const servidores = ['SRV-WEB', 'SRV-DB', 'SRV-APP'];

// Iteración tradicional con índice
for (let i = 0; i < servidores.length; i++) {
  console.log(servidores[i]);
}

// Iteración moderna con for...of
for (const srv of servidores) {
  console.log(`Servidor activo: ${srv}`);
}
