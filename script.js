console.log("hola mundo");
let edad=23;
if (edad=='23') {
    alert("Es verdad")
} else {
    alert("Es fañso")
}
alert(edad==='23'?)

const a=prompt("Ingrese el primer numero: ");
const b=prompt("Ingrese el segundo numero: ");
const c=prompt("Ingrese el tercer numero: ");

let mayor=a 
if (b>a) {
    mayor=b
    if(c>b){
        mayor=c;
        }
}
alert(`El mayor es (mayor)`);

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