function removeCards(results) {
  const elementosCards = document.querySelectorAll(".result-item");

  if (elementosCards.length == 0) {
    return;
  } else
    elementosCards.forEach((e) => {
      e.remove();
    });
}
function mostrarResultado(results) {
  removeCards();

  for (const r of results) {
    //console.log(r);
    const contenedor = document.querySelector(".results");
    const template = document.querySelector("#result-item-template");

    const titleEl = template.content.querySelector(".result-item-title");
    titleEl.textContent = r.title;

    const conditionEl = template.content.querySelector(
      ".result-item-condition"
    );
    conditionEl.textContent = r.condition;

    const imgEl = template.content.querySelector(".result-item-img");
    imgEl.setAttribute("src", r.thumbnail);

    const precioEl = template.content.querySelector(".result-item-price");
    precioEl.textContent = "$" + r.price;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}

function main() {
  const formEl = document.querySelector(".search-form");
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const palabraABuscar = e.target.buscar.value;

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar)
      .then((response) => response.json())
      .then((data) => mostrarResultado(data.results));
  });
}

main();
