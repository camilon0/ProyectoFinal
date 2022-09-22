const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;

const fragment = document.createDocumentFragment();

const urlApi = "http://localhost:3000/products";

let carrito = {};
//Cuando recarga la pagina hace esto

const fetchData = async () => {
  try {
    const res = await fetch(`${urlApi}`);
    const data = await res.json();
    //console.log(data);
    printCards(data);
  } catch (error) {
    console.log(error);
  }
};
//pintado de cartas por querySelector
const printCards = (data) => {
  data.forEach((producto) => {
    //console.log(producto);

    //templateCard.querySelector(".span-name").textContent = producto.category;
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
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));

    pintarCarrito();
  }
});
console.log(carrito);
cards.addEventListener("click", (e) => {
  addCarrito(e);
});

items.addEventListener("click", (e) => {
  btnAction(e);
});

const addCarrito = (e) => {
  //   console.log(e.target);
  //     console.log(e.target.classList.contains("btn-dark"));
  if (e.target.classList.contains("btn-dark")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};
const setCarrito = (objeto) => {
  console.log(objeto);
  const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,
    name: objeto.querySelector("h5").textContent,
    price: objeto.querySelector("p").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  carrito[producto.id] = { ...producto };
  pintarCarrito();
};
const pintarCarrito = () => {
  //console.log(carrito);
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.name;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.price;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  pintarFooter();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`;
    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, price }) => acc + cantidad * price,
    0
  );
  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
  });
};
const btnAction = (e) => {
  if (e.target.classList.contains("btn-info")) {
    carrito[e.target.dataset.id];
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
  }

  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    pintarCarrito();
  }
  e.stopPropagation();
};
//ADD FAVORITOS Y DETALLES
let favorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];

document.addEventListener("click", ({ target }) => {
  if (target.classList.contains("btn-white")) {
    localStorage.setItem("idVer", JSON.stringify(target.name));
    window.location.href = "../pages/details.html";
  }
  if (target.classList.contains("btn-red")) {
    const confirmarFavorito = confirm(
      `Desea agregar ${target.name} a favoritos?`
    );

    if (confirmarFavorito) {
      getData(urlApi)
        .then(() => {
          const character = data.find(
            (item) => item.id === parseInt(target.name)
          );
          favorites.push(character);

          localStorage.setItem("favorite", JSON.stringify(favorites));

          const btnFav = document.getElementById(target.id);

          btnFav.setAttribute("disabled", "");
          console.log(btnFav);
          // addFavorites(character, favorites, target);
        })
        .catch((error) => console.log(error));
    }
  }
});
