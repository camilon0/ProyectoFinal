const cards = document.getElementById("cards");
const urlApi = "http://localhost:3000/products";

let products = [];

const printCards = (data) => {
  data.forEach((producto) => {
    console.log(producto);

    templateCard.querySelector(".span-name").textContent = producto.category;
    templateCard.querySelector(".name").textContent = producto.name;
    templateCard.querySelector(".unit").textContent = producto.quantity;
    templateCard.querySelector(".price").textContent = producto.price;
    templateCard.querySelector("img").setAttribute("src", producto.image);
    templateCard.querySelector(".btn-dark").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

const myFavorites = JSON.parse(localStorage.getItem("favorite")) || [];

console.log(myFavorites);

const main = document.getElementById("main");

document.addEventListener("DOMContentLoaded", () => {
  if (myFavorites !== []) {
    printCards(myFavorites, main);
  }

  if (myFavorites === []) {
    const h5 = document.createElement("h5");
    h5.innerText = "Usted no tiene favoritos guardados";
    main.appendChild(h5);
  }
});
