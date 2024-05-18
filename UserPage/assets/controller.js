//VARIABLE

const cartIconEl = document.querySelector(".cart-shopping");
const menuCartEl = document.querySelector(".menu-cart");
const overlayEl = document.querySelector(".overlay");
const closeEl = document.querySelector(".close");
const numberEl = document.querySelector(".number");
let cart = [];

const renderPriceZero = () => {
  const totalEl = document.querySelector(".total");
  totalEl.innerHTML = `Total Price : ${0} $`;
};

const renderTotalPrice = () => {
  const totalPrice = cart.reduce((total, item) => {
    return (total += item.price * item.quantity);
  }, 0);
  const totalEl = document.querySelector(".total");
  return (totalEl.innerHTML = `Total Price : ${totalPrice} $`);
};

const renderItemInCart = (cart) => {
  const renderInCart = document.querySelector(".cart-items");
  let html = "";

  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      html += `
      <div class="cart-row">
      <div class="cart-img">
      <img src="${product.img}"
          alt="">
      </div>
  <div class="cart-name">${product.name}</div>
  <div class="quantity">
      <a class="plus" onClick="plusQuantity(${product.id})"> + </a> ${
        product.quantity
      } <a class="minus" onClick="minusQuantity(${product.id})"> - </a>
  </div>
  <div class="price">
     ${product.price * product.quantity} 
  </div>
  <div class="trash" onClick="deleteProduct(${product.id})">
      <i class="fa-solid fa-trash"></i>
  </div>
  </div>
      <div class="card-cta">
          <button class="buy" onClick="clearCart()">Purchase</button>
      </div>
        `;
      renderInCart.innerHTML = html;
      renderTotalPrice();
    }
  }
  if (cart.length <= 0) {
    const renderInCart = document.querySelector(".cart-items");
    renderInCart.innerHTML = "KHÔNG CÓ SẢN PHẨM";
    renderPriceZero();
  }
};

const handleShowQuantity = (cart) => {
  let total = 0;
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      const cartItem = cart[i];
      total += cartItem.quantity;
      numberEl.textContent = total;
    }
  } else {
    numberEl.textContent = total;
  }
};

const dataJson = localStorage.getItem("dataPhone");
if (dataJson !== null) {
  let dataPhoneRaw = JSON.parse(dataJson);
  cart = [...dataPhoneRaw];
  renderItemInCart(cart);
  handleShowQuantity(cart);
}

const renderProductList = (productList) => {
  const renderEl = document.querySelector(".card-list");
  let html = "";
  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    html += `
    <div class="card">
    <div class="card-top">
        <i class="fa-brands fa-apple"></i>
        <span>In Stock</span>
    </div>
    <div class="card-image">
        <img class="product-image"
            src="${product.img}" alt="">
    </div>
    <div class="card-detail">
        <h3 class="card-name">${product.name}</h3>
        <p class="card-price">${product.price}$</p>
    </div>
    <div class="card-action">
        <button onClick = "handleAddProduct(${product.id})">Add</button>
    </div>
</div>
    `;
  }
  renderEl.innerHTML = html;
};
const showMessage = (message, isSuccess = true) => {
  Toastify({
    text: message,
    duration: 2000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

const handleAddProduct = (productId) => {
  fetchProductId(productId);
  showMessage("Sản phẩm đã thêm vào giỏ hàng");
  handleShowQuantity(cart);
};

const clearCart = () => {
  cart = [];
  const dataProduct = JSON.stringify(cart);
  localStorage.setItem("dataPhone", dataProduct);
  showMessage("Thanh toán sản phẩm thành công");
  renderItemInCart(cart);
  handleShowQuantity(cart);
};

const handleProductInCart = (product) => {
  const indexProduct = cart.findIndex((item) => {
    return item.id === product.id;
  });

  if (indexProduct !== -1) {
    cart[indexProduct].quantity += 1;
    const dataProduct = JSON.stringify(cart);
    localStorage.setItem("dataPhone", dataProduct);

    renderItemInCart(cart);
    handleShowQuantity(cart);
  } else {
    const cartItem = {
      ...product,
      quantity: 1,
    };
    cart.push(cartItem);
    const dataProduct = JSON.stringify(cart);
    localStorage.setItem("dataPhone", dataProduct);
    renderItemInCart(cart);
    handleShowQuantity(cart);
  }
};

const filterCart = [];
const handleGetData = (data) => {
  for (let i = 0; i < data.length; i++) {
    filterCart.push(data[i]);
  }
};

const handleFilterProduct = () => {
  const selectedEl = document.getElementById("mySelect");
  let valueSelected = selectedEl.value;

  if (valueSelected === "Samsung") {
    console.log("🚀filterCart---->", filterCart);
    const filterSamsung = filterCart.filter((item) => {
      return item.type === "Samsung";
    });
    renderProductList(filterSamsung);
  }

  if (valueSelected === "Iphone") {
    const filterIphone = filterCart.filter((item) => {
      return item.type === "Iphone";
    });
    renderProductList(filterIphone);
  }

  if (valueSelected === "--") {
    renderProductList(filterCart);
  }
};

const plusQuantity = (productId) => {
  const findProduct = cart.findIndex((item) => {
    return Number(item.id) === productId;
  });
  cart[findProduct].quantity += 1;
  renderItemInCart(cart);
  handleShowQuantity(cart);
};

const minusQuantity = (productId) => {
  const newCart = [...cart];
  const findProduct = newCart.findIndex((item) => {
    return Number(item.id) === productId;
  });
  if (newCart[findProduct].quantity <= 1) {
    alert("Số lượng sản phẩm không được nhỏ hơn 1");
    return;
  }
  newCart[findProduct].quantity -= 1;
  renderItemInCart(newCart);
  handleShowQuantity(newCart);
};

const deleteProduct = (productId) => {
  const findProduct = cart.findIndex((item) => {
    return Number(item.id) === productId;
  });
  cart.splice(findProduct, 1);
  const dataProduct = JSON.stringify(cart);
  localStorage.setItem("dataPhone", dataProduct);
  showMessage("Sản phẩm đã được xóa");
  renderItemInCart(cart);
  handleShowQuantity(cart);
};

// ===========================CSS================================
const handleOpenCart = () => {
  menuCartEl.classList.add("active");
  overlayEl.style.display = "block";
};

const handleCloseCart = () => {
  menuCartEl.classList.remove("active");
  overlayEl.style.display = "none";
};

overlayEl.addEventListener("click", handleCloseCart);
cartIconEl.addEventListener("click", handleOpenCart);
closeEl.addEventListener("click", handleCloseCart);
