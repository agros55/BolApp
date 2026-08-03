const contenedorBotones = document.getElementById("contenedor-botones");
const totalElemento = document.getElementById("total");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnDeshacer = document.getElementById("btn-deshacer");
const contadorElemento = document.getElementById("contador-boletos");
const serieElemento = document.getElementById("serie-actual");
const precioActualElemento = document.getElementById("precio-actual");

// Modal de número de serie
const modalSerie = document.getElementById("modal-serie");
const inputSerie = document.getElementById("input-serie");
const btnComenzar = document.getElementById("btn-comenzar");

let total = 0;
let historial = [];
let serieInicial = 0;
let contador = 0;

// Busca una propiedad ignorando espacios en la clave y limpia el valor
function obtenerCampo(objeto, campo) {
  const clave = Object.keys(objeto).find((k) => k.trim() === campo);
  return clave ? objeto[clave].trim() : "";
}

function actualizarResultado() {
  totalElemento.textContent = `Total: $${total.toLocaleString("es-AR")}`;
  contadorElemento.textContent = `Boletos: ${contador}`;

  if (contador > 0 && historial.length > 0) {
    const serieActual = serieInicial + contador - 1;
    const precioActual = historial[historial.length - 1];

    serieElemento.textContent = `N° Boleto: ${serieActual}`;
    precioActualElemento.textContent = `$${precioActual.toLocaleString("es-AR")}`;
  } else {
    serieElemento.textContent = `N° Boleto: —`;
    precioActualElemento.textContent = `Precio: —`;
  }

  btnDeshacer.disabled = contador === 0;
}

// ---- Confirmar número de serie inicial ----
function comenzar() {
  const valor = parseInt(inputSerie.value, 10);
  serieInicial = isNaN(valor) ? 0 : valor;

  contador = 0;
  total = 0;
  historial = [];

  modalSerie.classList.add("oculto");
  actualizarResultado();
}

btnComenzar.addEventListener("click", comenzar);

inputSerie.addEventListener("keydown", (e) => {
  if (e.key === "Enter") comenzar();
});

// ---- Fetch y creación de botones ----
fetch("assets/recorridos/25mayo.json")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    datos.forEach((registro) => {
      const nombre = obtenerCampo(registro, "name");
      const precio = parseInt(obtenerCampo(registro, "precio"), 10);

      const boton = document.createElement("button");
      boton.classList.add("btn-precio");
      boton.textContent = `$${precio}`;
      boton.title = nombre;

      boton.addEventListener("click", () => {
        total += precio;
        contador++;
        historial.push(precio);
        actualizarResultado();
      });

      contenedorBotones.appendChild(boton);
    });
  })
  .catch((error) => console.error("Error al cargar el JSON:", error));

// ---- Reiniciar ----
btnReiniciar.addEventListener("click", () => {
  total = 0;
  contador = 0;
  historial = [];

  actualizarResultado();

  inputSerie.value = serieInicial;
  modalSerie.classList.remove("oculto");
  inputSerie.focus();
});

// ---- Deshacer último ----
btnDeshacer.addEventListener("click", () => {
  if (historial.length > 0) {
    const ultimo = historial.pop();
    total -= ultimo;
    contador--;

    actualizarResultado();
  }
});

// Estado inicial
actualizarResultado();
inputSerie.focus();