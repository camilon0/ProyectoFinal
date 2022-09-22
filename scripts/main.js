const url = "http://localhost:3000/products";
//Filtrar por categoría. obtener el nombre dela categoria
const vegetableCategory = document.getElementById("liCategoryVegetables");
//Función para consultar los productos del archivo json
const getProducts = async () => {
  try {
    const response = await fetch(url);
    const products = await response.json();
    let result = filterCategory(products, vegetableCategory);
    // console.log(result);
    // console.log(products);
  } catch (error) {
    console.log(error);
  }
};
//Ejecutar la función para ver los resultados
getProducts();

//Filtrar por categoría. Función de filtrado
const filterCategory = (ArrayProducts, category) => {
  const filter = ArrayProducts.filter(
    (element) => element.category === parseInt(category.getAttribute("value"))
  );
  return filter;
};
