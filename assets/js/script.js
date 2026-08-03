/* let botones = document.getElementsByClassName("botones");
let resultado = document.getElementById(result);
let precios;


fetch('../assets/recorridos/25mayo.json')
.then(respuesta => respuesta.json())
.then(datos => {
    //console.log(datos); // Extraer un campo específico
    precios = datos; 
})
.catch(error => console.error('Error:', error));


console.log(precios);
 */

const contenedorBotones = document.getElementById("contenedor-botones");
const totalElemento = document.getElementById("total");
const btnReiniciar = document.getElementById("btn-reiniciar");

let total = 0;

// Busca una propiedad ignorando espacios en la clave y limpia el valor
function obtenerCampo(objeto, campo) {
  const clave = Object.keys(objeto).find(k => k.trim() === campo);
  return clave ? objeto[clave].trim() : "";
}

function actualizarResultado() {
  totalElemento.textContent = `Total: $${total.toLocaleString("es-AR")}`;
}

fetch("assets/recorridos/25mayo.json")
  .then(respuesta => respuesta.json())
  .then(datos => {
    datos.forEach(registro => {
      const nombre = obtenerCampo(registro, "name");
      const precio = parseInt(obtenerCampo(registro, "precio"), 10);

      const boton = document.createElement("button");
      boton.classList.add("btn-precio");
      boton.textContent = `$${precio}`;

      boton.addEventListener("click", () => {
        total += precio;
        actualizarResultado();
      });

      contenedorBotones.appendChild(boton);
    });
  })
  .catch(error => console.error("Error al cargar el JSON:", error));

btnReiniciar.addEventListener("click", () => {
  total = 0;
  actualizarResultado();
});
