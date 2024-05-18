const inputAllSelector = document.querySelectorAll(".form-group input");
const errorMessageAll = document.querySelectorAll(".errorMessage");
const inputTypeEl = document.getElementById("loaiSP");
const btnAddNew = document.getElementById("btnThemSP");
const updateBtn = document.querySelector(".update");
updateBtn.disabled = true;

const validateForm = () => {
  let isNameValid;
  let isPriceValid;
  let isImageValid;
  let isDescValid;
  let isTypeValid;
  for (let i = 0; i < inputAllSelector.length; i++) {
    let inputSelector = inputAllSelector[i];
    let name = inputSelector.getAttribute("name");
    if (name === "name") {
      isNameValid = validateName(inputSelector);
    } else if (name === "price") {
      isPriceValid = validatePrice(inputSelector);
    } else if (name === "image") {
      isImageValid = validateImage(inputSelector);
    } else if (name === "desc") {
      isDescValid = validateDesc(inputSelector);
    }
    if (inputTypeEl) {
      isTypeValid = validateType();
    }
  }
  if (
    isNameValid &&
    isPriceValid &&
    isImageValid &&
    isTypeValid &&
    isDescValid
  ) {
    return true;
  } else {
    return false;
  }
};

const showMessage = (message, isSucceed = true) => {
  Toastify({
    text: message,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

const validateName = (inputSelector) => {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Tên sản phẩm không để trống");
  } else if (!minLength(inputSelector)) {
    showError(
      inputSelector,
      `Tên sản phẩm tối thiểu ${inputSelector.getAttribute("min_length")} ký tự`
    );
  } else {
    showSucceed(inputSelector);
    isValid = true;
  }
  return isValid;
};

const validatePrice = (inputSelector) => {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Gía sản phẩm không để trống");
  } else if (!minLength(inputSelector)) {
    showError(
      inputSelector,
      `Gía sản phẩm tối thiểu ${inputSelector.getAttribute("min_length")} ký tự`
    );
  } else {
    showSucceed(inputSelector);
    isValid = true;
  }
  return isValid;
};

const validateImage = (inputSelector) => {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Hình ảnh sản phẩm không để trống");
  } else if (!minLength(inputSelector)) {
    showError(
      inputSelector,
      `Hình ảnh sản phẩm tối thiểu ${inputSelector.getAttribute(
        "min_length"
      )} ký tự`
    );
  } else {
    showSucceed(inputSelector);
    isValid = true;
  }
  return isValid;
};

const validateDesc = (inputSelector) => {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Mô tả sản phẩm không để trống");
  } else if (!minLength(inputSelector)) {
    showError(
      inputSelector,
      `Tên sản phẩm tối thiểu ${inputSelector.getAttribute("min_length")} ký tự`
    );
  } else {
    showSucceed(inputSelector);
    isValid = true;
  }
  return isValid;
};

const validateType = () => {
  let isValid = false;
  const valueType = inputTypeEl.value;

  const divMessageType = inputTypeEl
    .closest(".form-group")
    .querySelector(".errorMessage");
  if (valueType === "") {
    divMessageType.classList.add("error");
    divMessageType.textContent = "Vui lòng chọn hãng";
  } else {
    inputTypeEl.classList.remove("error");
    divMessageType.textContent = "";
    isValid = true;
  }
  return isValid;
};

const required = (inputSelector) => {
  return inputSelector.value ? true : false;
};

const showError = (inputSelector, message = null) => {
  let divMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".errorMessage");
  divMessageSelector.textContent = message;
};

const showSucceed = (inputSelector) => {
  inputSelector.classList.remove("error");

  let divMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".errorMessage");
  divMessageSelector.textContent = "";
};

const minLength = (inputSelector) => {
  let minlength = inputSelector.getAttribute("min_length");
  let inputValue = inputSelector.value;
  if (inputValue.length < minlength) {
    return false;
  }
  return true;
};

// =================END VALIDATE==============================

const renderProductList = (productList) => {
  const containerEl = document.getElementById("tblDanhSachSP");
  containerEl.innerHTML = "";
  let html = "";
  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    html += `
      <tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>
      <img width="80px" height="80px" src="${product.img}"/>
      </td>
      <td>${product.desc}</td>
      <td>${product.type}</td>
      <td>
      <button class="btn btn-primary" onClick="deleteProduct('${product.id}')">Delete</button>
      <button class="btn btn-danger" onClick="editProduct(${product.id})">Update</button>
      </td>
      
      </tr>
      `;
  }
  containerEl.innerHTML = html;
};

const getDataForm = () => {
  const nameEl = document.getElementById("TenSP").value;
  const priceEl = document.getElementById("GiaSP").value;
  const imageEl = document.getElementById("HinhSP").value;
  const descEl = document.getElementById("MotaSP").value;
  const typeEl = document.getElementById("loaiSP").value;

  const payload = {
    name: nameEl,
    price: priceEl,
    img: imageEl,
    desc: descEl,
    type: typeEl,
  };
  return payload;
};

const filterCart = [];
const getDataApi = (data) => {
  filterCart.length = 0;
  for (let i = 0; i < data.length; i++) {
    filterCart.push(data[i]);
  }
};

const searchProduct = () => {
  const inputSearchEl = document.querySelector(".inputSearch").value;
  const valueSearch = inputSearchEl.toLowerCase();
  const newData = filterCart.filter((item) => {
    return item.name.toLowerCase().includes(valueSearch);
  });
  renderProductList(newData);
};

const handleFilterPrice = () => {
  const inputTypePrice = document.getElementById("myPrice");
  const valuePrice = inputTypePrice.value;

  if (valuePrice === "highToLow") {
    filterCart.sort((a, b) => b.price - a.price);
    const newCart = [...filterCart];

    renderProductList(newCart);
  } else if (valuePrice === "lowToHigh") {
    filterCart.sort((a, b) => a.price - b.price);
    renderProductList(filterCart);
  }
};
