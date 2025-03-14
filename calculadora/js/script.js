/* FORMA DE SUMAR, MULTIPLICAR ETC*/

/* let numero = 23;
let numero2 = 20;
alert (numero * numero2)

let numero3= 23;
let numero4= 20;
alert(numero3 + numero4) */

/*FORMA DE  INTERACTUAR CON EL USUARIO CON PROMPT*/

/* let nombre= prompt("dime tu nombre")
alert("hola " + nombre) */

/*Carrito de compras */

// const productos = [
//     { nombre: "iphone 11", precio: 350000 },
//     { nombre: "iphone 16pro", precio: 1000000 },
//     { nombre: "iphone 13", precio: 500000 },
//     { nombre: "iphone 12", precio: 400000 },
// ];
// let Carrito = []

// let seleccion = prompt("hola desea comprar algun producto si o no")

// while (seleccion != "si" && seleccion != "no") {
//     alert("por favor ingresa si o no")
//     seleccion = prompt("hola desea comprar algo (si o no)")
// };

// if (seleccion == "si") {
//     alert("a continuación nuestra pagina con los productos")
//     console.log(productos)
// } else if (seleccion == "no") {
//     alert("gracias por haber pasado por esta pagina hasta luego!!")
// };


// let pregunta = prompt("¿Quieres saber cuántos productos compraste? (si o no)");

// if(pregunta=="si"){
//     alert("xx productos comprados")
// } else if(seleccion =="no"){
//     alert("¡no hay problema!")
// }


const suma = (num1, num2)=>{
    return parseInt(num1) + parseInt(num2);
}

const resta = (num1,num2)=>{
    return parseInt(num1) - parseInt(num2);
}

const multiplicación = (num1, num2)=>{
    return parseInt(num1) * parseInt(num2);
}
const división = (num1, num2)=>{
    return parseInt(num1) / parseInt(num2);
}

alert("Que operación desea realizar");
let operacion = prompt("1: suma, 2: resta, 3: multiplicación, 4: división")

if(operacion == 1){
    let num1 = prompt("primer numero para sumar");
    let num2 = prompt("segundo numero para sumar");
    resultado = suma(num1,num2);
    alert(`tu resultado es ${resultado}`);
}

else if(operacion == 2){
    let num1 = prompt("primer número para restar");
    let num2 = prompt("segundo número para restar");
    resultado = resta(num1,num2);
    alert(`tu resultado es ${resultado}`);
}

else if(operacion== 3){
    let num1 = prompt("primer número para multiplicar");
    let num2 = prompt("segundo número para multiplicar");
    resultado = multiplicación(num1,num2);
    alert(`tu resultado es ${resultado}`);
}

else if(operacion == 4){
    let num1 = prompt("primer número para dividir");
    let num2 = prompt("segundo número para dividir");
    resultado = división(num1,num2);
    alert(`tu resultado es ${resultado}`);
} 

else{ 
    alert("la operación no se a encontrado")
}
console.log(suma, resta, multiplicación, división)