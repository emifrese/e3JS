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

const savedPizza = JSON.parse(localStorage.getItem("pizza"));

const pizzaForm = document.querySelector("#pizzaForm");
const pizzaInput = document.querySelector("#pizzaInput");
const pizzaButton = document.querySelector("#pizzaButton");

const pizzaContainer = document.querySelector("#pizzaContainer");

const submitHandler = (e) => {
  e.preventDefault();

  const pizzaNumber = parseInt(pizzaInput.value.trim());

  if (!pizzaNumber) {
    return (pizzaContainer.innerHTML =
      "<p>Para realizar su orden, ingrese un número</p>");
  }

  const pizzaSelected = pizzas.find((pizza) => pizza.id === pizzaNumber);

  if (!pizzaSelected) {
    return (pizzaContainer.innerHTML =
      "<p>El número ingresado no corresponde con ningún producto</p>");
  }

  localStorage.setItem("pizza", JSON.stringify(pizzaSelected));

  return (pizzaContainer.innerHTML = `
            <h2>${pizzaSelected.nombre.toUpperCase()}</h2>
            <figure>
              <figcaption>${pizzaSelected.precio}</figcaption>
              <img src=${pizzaSelected.imagen} alt="">
            </figure>
          `);
};

const init = () => {
  pizzaForm.addEventListener("submit", submitHandler);
  if (savedPizza) {
    pizzaContainer.innerHTML = `
  <h2>${savedPizza.nombre.toUpperCase()}</h2>
  <figure>
    <figcaption>${savedPizza.precio}</figcaption>
    <img src=${savedPizza.imagen} alt="">
  </figure>
`;
  }
};

init();
