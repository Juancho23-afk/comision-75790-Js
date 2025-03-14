
/* FORMA DE SUMAR, MULTIPLICAR ETC*/

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