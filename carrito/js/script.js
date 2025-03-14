
/*Carrito de compras */

const productos = [
    { nombre: "iphone 11", precio: 350000 },
    { nombre: "iphone 16pro", precio: 1000000 },
    { nombre: "iphone 13", precio: 500000 },
    { nombre: "iphone 12", precio: 400000 },
];
let Carrito = []

let seleccion = prompt("hola desea comprar algun producto si o no")

while (seleccion != "si" && seleccion != "no") {
    alert("por favor ingresa si o no")
    seleccion = prompt("hola desea comprar algo (si o no)")
};

if (seleccion == "si") {
    alert("a continuación nuestra pagina con los productos")
    console.log(productos)
} else if (seleccion == "no") {
    alert("gracias por haber pasado por esta pagina hasta luego!!")
};


let pregunta = prompt("¿Quieres saber cuántos productos compraste? (si o no)");

if(pregunta=="si"){
    alert("xx productos comprados")
} else if(seleccion =="no"){
    alert("¡no hay problema!")
}
