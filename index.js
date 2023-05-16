const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

// Local Storage

const savedPizza = JSON.parse(localStorage.getItem("pizza"));

// DOM Elements

const pizzaForm = document.querySelector("#pizzaForm");
const pizzaInput = document.querySelector("#pizzaInput");
const pizzaButton = document.querySelector("#pizzaButton");

const pizzaContainer = document.querySelector("#pizzaContainer");

// Helpers

const alertFeedback = (alert) => {
  return `<p class='${alert.class}'>${alert.message}</p>`;
};

const manageLocalStorage = (item) => {
  if (item) {
    localStorage.setItem("pizza", JSON.stringify(item));
  } else {
    localStorage.removeItem("pizza");
  }
};

const pizzaDisplay = ({ nombre, precio, imagen }) => {
  return `<h2>${nombre.toUpperCase()}</h2>
  <figure>
    <figcaption>${precio}</figcaption>
    <img src=${imagen} alt="">
  </figure>`;
};


// Handlers 

const inputHandler = (e) => {
  if (!e.target.value.trim()) {
    e.target.classList.add("empty");
  } else {
    e.target.classList.remove("empty");
  }
};

const submitHandler = (e) => {
  e.preventDefault();

  const pizzaNumber = parseInt(pizzaInput.value.trim());

  if (!pizzaNumber) {
    manageLocalStorage()
    pizzaContainer.innerHTML = alertFeedback({
      message: "Para realizar su orden, ingrese un número",
      class: "noInput",
    });
    return
  }

  const pizzaSelected = pizzas.find((pizza) => pizza.id === pizzaNumber);

  if (!pizzaSelected) {
    manageLocalStorage()
    pizzaContainer.innerHTML = alertFeedback({
      message: "El número ingresado no corresponde con ningún producto",
      class: "notFound", 
    })
    return;
  }

  manageLocalStorage(pizzaSelected);
  pizzaContainer.innerHTML = pizzaDisplay(pizzaSelected)
  return;
};

// Init function

const init = () => {
  pizzaForm.addEventListener("submit", submitHandler);
  pizzaInput.addEventListener("input", inputHandler);
  if (savedPizza) {
    pizzaContainer.innerHTML = pizzaDisplay(savedPizza);
    pizzaInput.value = savedPizza.id;
    pizzaInput.classList.remove("empty");
  }
};

init();
