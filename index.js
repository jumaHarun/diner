const menuItems = [
  {
    name: "Pizza",
    desc: "pepperoni, mushrom, mozarella",
    price: 14,
    image: "🍕",
    orders: 0,
  },
  {
    name: "Hamburger",
    desc: "beef, cheese, lettuce",
    price: 12,
    image: "🍔",
    orders: 0,
  },
  {
    name: "Beer",
    desc: "grain, hops, yeast, water",
    price: 12,
    image: "🍺",
    orders: 0,
  },
];
const paymentForm = document.getElementById("payForm");
const ordersEl = document.getElementById("order");
let total = 0;

document.addEventListener("click", (e) => {
  if (e.target.dataset.cart) {
    handleAddToCartClick(e.target.dataset.cart);
  } else if (e.target.dataset.purchase) {
    handlePurchaseBtnClick(e.target.dataset.purchase);
  } else if (e.target.dataset.remove) {
    handleRemoveBtnClick(e.target.dataset.remove);
  }
});

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const paymentFormData = new FormData(paymentForm);
  const name = paymentFormData.get("name");

  checkout.style.display = "none";

  ordersEl.innerHTML = `
    <p class="thanks">
        Thanks, ${name}! Your order is on its way!
    </p>
    `;
  menuItems.map((item) => (item.orders = 0));

  setTimeout(() => {
    ordersEl.innerHTML = "";
  }, 3000);
});

function handlePurchaseBtnClick(btnId) {
  const checkout = document.getElementById("checkout");
  if (btnId === "purchaseBtn") {
    checkout.style.display = "block";
  }
}

function handleRemoveBtnClick(itemId) {
  menuItems.map((item) => {
    if (item.name === itemId) {
      item.orders--;
    }
  });
  render();
}

function handleAddToCartClick(ItemId) {
  menuItems.map((item) => {
    if (item.name === ItemId) {
      item.orders++;
    }
  });
  render();
}

function updateTotal() {
  total = 0;
  menuItems.map((item) => {
    total += item.price * item.orders;
  });
}

function getOrdersItemHtml(items) {
  let html = "";

  items.map((item) => {
    const { name, price, orders } = item;
    if (orders > 0) {
      html += `
        <div class="order-item-details">
            <div class="order-item-detail" id="${name}">
                <span class="orders" id="orders">
                ${orders}
                </span>
                <h4 class="item-name">
                    ${name}
                </h4>
                <button class="remove-item-btn" data-remove="${name}">remove</button>
            </div>
            <p class="order-item-total">
                $${price * orders}
            </p>
        </div>
        `;
    }
  });

  html = `
    <h4>Your order</h4>
    <div class="order-details">
        <div class="order-items" id="orderItems">
        ${html}
        </div>
        <div class="order-total">
            <h4 class="total-title">Total price:</h4>
            <p class="total-price" id="totalPrice">$${total}</p>
        </div>
        <button class="purchase-btn" data-purchase="purchaseBtn">Complete order</button>
    </div>
    `;

  return total > 0 ? html : "";
}

function getMenuItemsHtml(items) {
  let html = "";

  items.map((item) => {
    const { name, desc, price, image } = item;

    html += `
        <div class="menu-item" id="${name}">
            <div class="item-img">
                <p>${image}</p>
            </div>
            <div class="item-details">
                <h4 class="item-name">${name}</h4>
                <p class="item-desc">${desc}</p>
                <p class="item-price">$${price}</p>

                <button class="add-to-cart" data-cart="${name}">+</button>
            </div>
        </div>
        `;
  });

  return html;
}

function render() {
  updateTotal();
  document.getElementById("menu").innerHTML = getMenuItemsHtml(menuItems);
  ordersEl.innerHTML = getOrdersItemHtml(menuItems);
}

render();