
const edad=prompt("Ingrese su edad");
let mensaje;
if (edad<2) {
    mensaje="bebe";
} else if (edad=12) {
    mensaje="niño";
} else if (edad<22) {
    mensaje="adolescente";
} else if (edad<60) {
    mensaje="abuelo";    
}