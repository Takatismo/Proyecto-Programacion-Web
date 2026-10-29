
const edad = Number(prompt("Ingrese su edad"));

let mensaje;
let descuento = 0;

if (edad < 0 || Number.isNaN(edad)) {
    mensaje = "Edad inválida";
} else if (edad < 2) {
    mensaje = "Bebé";
} else if (edad <= 12) {
    mensaje = "Niño";
} else if (edad < 22) {
    mensaje = "Adolescente";
} else if (edad < 60) {
    mensaje = "Adulto";
} else {
    mensaje = "Adulto mayor";
}

switch (mensaje) {
    case "Bebé":
        descuento = 0.10;
        break;
    case "Niño":
        descuento = 0.20;
        break;
    case "Adolescente":
        descuento = 0.15;
        break;
    case "Adulto":
        descuento = 0.05;
        break;
    case "Adulto mayor":
        descuento = 0.30;
        break;
    case "Edad inválida":
        console.log(mensaje);
        break;
}

if (mensaje !== "Edad inválida") {
    console.log("Categoría:", mensaje);
    console.log("Descuento:", descuento * 100 + "%");
}

let edades = [10, 20, 25, 30];

for (let i = 1; i < edades.length; i++) {
    console.log(edades[i]);
}