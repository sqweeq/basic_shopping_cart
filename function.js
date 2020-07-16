// data
const products = [
  [{ name: "Sledgehammer", price: 125.75 }],
  [{ name: "Axe", price: 190.5 }],
  [{ name: "Bandsaw", price: 562.131 }],
  [{ name: "Chisel", price: 12.9 }],
  [{ name: "Hacksaw", price: 18.45 }],
];

const views = document.querySelector(".views");
const cart = document.querySelector(".cart");
const cartTotals = document.querySelector(".totals");

// product list
products.forEach((item, i) => {
  const product = document.createElement("li");
  const name = document.createElement("h5");
  const price = document.createElement("p");
  const button = document.createElement("button");
  const targetItem = {};
  targetItem.name = item[0].name;
  targetItem.price = item[0].price.toFixed(2);
  targetItem.key = i;
  targetItem.quantity = 1;
  product.setAttribute("class", "card container");
  button.setAttribute("class", "w-50");
  name.textContent = item[0].name;
  price.textContent = "$" + item[0].price.toFixed(2);
  button.addEventListener("click", function () {
    addToLocal(targetItem);
    loadCart();
    loadTotals();
  });
  button.textContent = "Add";
  product.appendChild(name);
  product.appendChild(price);
  product.appendChild(button);
  views.appendChild(product);
});
// add to local
function addToLocal(input) {
  const localItems = JSON.parse(localStorage.getItem("items")) || [];
  const existingFound = localItems.find((o) => o.name === input.name);
  if (existingFound) existingFound.quantity++;
  else localItems.push(input);
  localStorage.setItem("items", JSON.stringify(localItems));
  loadCart();
  loadTotals();
}
// load cart
function loadCart() {
  cart.innerHTML = "";
  const localItems = JSON.parse(localStorage.getItem("items")) || [];
  localItems.map((item) => {
    if (item.quantity > 0) {
      const div = document.createElement("div");
      const name = document.createElement("p");
      const price = document.createElement("p");
      const quantity = document.createElement("p");
      const itemsPrice = document.createElement("p");
      const button2 = document.createElement("button");
      button2.setAttribute("class", "w-50");
      button2.innerHTML = "X";
      button2.addEventListener("click", function () {
        deleteFromLocal(item);
        loadCart();
        loadTotals();
      });
      div.setAttribute("class", "card container");
      name.innerHTML = item.name;
      const itemsCost = (item.price * item.quantity).toFixed(2);
      price.innerHTML = "$" + item.price;
      quantity.innerHTML = "X " + item.quantity;
      itemsPrice.innerHTML = "= $" + itemsCost;
      div.appendChild(name);
      div.appendChild(price);
      div.appendChild(quantity);
      div.appendChild(itemsPrice);
      div.appendChild(button2);
      cart.appendChild(div);
    } else null;
  });
}
// load total prices
function loadTotals() {
  cartTotals.innerHTML = "";
  const localItems = JSON.parse(localStorage.getItem("items")) || [];
  const priceDiv = document.createElement("div");
  const totalPrice = document.createElement("h2");
  // calculate price
  function getSum(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += localItems[i].price * localItems[i].quantity;
    }
    return sum;
  }
  totalPrice.textContent = "TOTAL TO PAY = $" + getSum(localItems).toFixed(2);
  totalPrice.setAttribute("class", "card");
  priceDiv.appendChild(totalPrice);
  cartTotals.appendChild(priceDiv);
}
// delete from cart
function deleteFromLocal(y) {
  const localItems = JSON.parse(localStorage.getItem("items")) || [];
  const existingFound = localItems.find((o) => o.name === y.name);
  if (existingFound) existingFound.quantity--;
  localStorage.setItem("items", JSON.stringify(localItems));
  loadCart();
}
loadCart();
loadTotals();
