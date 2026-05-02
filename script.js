let cart = {};
let total = 0;

const cartBox = document.getElementById("miniCart");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const emptyCart = document.getElementById("emptyCart");
const closeCartBtn = document.getElementById("closeCart");
const cancelAllBtn = document.getElementById("cancelAllBtn");
const goToCartBtn = document.getElementById("goToCartBtn");

// Add to Cart - using event delegation for all buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  const name = btn.dataset.name;
  const price = parseFloat(btn.dataset.price);

  if (cart[name]) {
    cart[name].qty++;
  } else {
    cart[name] = { price: price, qty: 1 };
  }

  updateCart();
});

// Remove single item from cart
function removeItem(name) {
  if (cart[name]) {
    cart[name].qty--;
    if (cart[name].qty <= 0) {
      delete cart[name];
    }
  }
  updateCart();
}

// Delete entire item from cart
function deleteItem(name) {
  delete cart[name];
  updateCart();
}

// Cancel All - clear entire cart
cancelAllBtn.addEventListener("click", () => {
  cart = {};
  updateCart();
});

// Close cart panel
closeCartBtn.addEventListener("click", () => {
  cartBox.classList.add("d-none");
});

// // Go to Cart button
// goToCartBtn.addEventListener("click", () => {
//   if (Object.keys(cart).length === 0) {
//     alert("Your cart is empty!");
//     return;
//   }

//   let message = "🛒 Order Summary:\n\n";
//   for (let item in cart) {
//     let qty = cart[item].qty;
//     let price = cart[item].price * qty;
//     message += `• ${item} (x${qty}) — $${price.toFixed(2)}\n`;
//   }
//   message += `\n💰 Total: $${total.toFixed(2)}`;
//   message += "\n\nProceed to checkout?";

//   if (confirm(message)) {
//     alert("Thank you for your order! 🎉");
//     cart = {};
//     updateCart();
//   }
// });

// Update cart UI
function updateCart() {
  cartItems.innerHTML = "";
  total = 0;

  const itemCount = Object.keys(cart).length;

  if (itemCount === 0) {
    emptyCart.classList.remove("d-none");
    cartItems.classList.add("d-none");
  } else {
    emptyCart.classList.add("d-none");
    cartItems.classList.remove("d-none");
  }

  for (let item in cart) {
    let qty = cart[item].qty;
    let price = cart[item].price * qty;
    total += price;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center px-0 py-2";
    li.innerHTML = `
      <div class="me-2">
        <span class="fw-semibold small">${item}</span>
        <br>
        <span class="text-muted small">x${qty} — $${price.toFixed(2)}</span>
      </div>
      <div class="d-flex gap-1">
        <button class="btn btn-outline-secondary btn-sm px-2 py-0"
          onclick="removeItem('${item}')" title="Remove one">
          <i class="bi bi-dash"></i>
        </button>
        <button class="btn btn-outline-danger btn-sm px-2 py-0"
          onclick="deleteItem('${item}')" title="Delete item">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
    cartItems.appendChild(li);
  }

  totalPrice.textContent = total.toFixed(2);

  // Show cart if there are items, keep visible even if empty (user can close)
  cartBox.classList.remove("d-none");
}