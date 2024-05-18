const BASE_URL = "https://62b6eabe6999cce2e80a17ba.mockapi.io/api/cart";

const fetchProductList = () => {
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(({ data }) => {
      console.log("🚀data---->", data);
      renderProductList(data);
      getDataApi(data);
    })
    .catch((error) => {
      console.log("🚀error---->", error);
    });
};

fetchProductList();

const deleteProduct = (productId) => {
  axios({
    url: `${BASE_URL}/${productId}`,
    method: "DELETE",
  })
    .then(({ data }) => {
      fetchProductList();
    })
    .catch((error) => {
      console.log("🚀error---->", error);
    });
};

const addNewProduct = () => {
  const isValid = validateForm();

  if (isValid) {
    const payload = getDataForm();
    axios({
      url: BASE_URL,
      method: "POST",
      data: payload,
    })
      .then(({ data }) => {
        showMessage("Đã tạo mới sản phẩm");
        fetchProductList();
        $("#myModal").modal("hide");
      })
      .catch((error) => {
        console.log("🚀error---->", error);
      });
  }
};
let productUpdateId = null;

const editProduct = (productId) => {
  updateBtn.disabled = false;
  productUpdateId = productId;
  document.querySelector(".modal-title").innerText = `ID: ${productId}`;
  axios({
    url: `${BASE_URL}/${productId}`,
    method: "GET",
  })
    .then(({ data }) => {
      $("#myModal").modal("show");
      const addBtn = document.querySelector(".add");
      addBtn.disabled = true;
      document.getElementById("TenSP").value = data.name;
      document.getElementById("GiaSP").value = data.price;
      document.getElementById("HinhSP").value = data.img;
      document.getElementById("MotaSP").value = data.desc;
      document.getElementById("loaiSP").value = data.type;
    })
    .catch((error) => {
      console.log("🚀error---->", error);
    });
};

const updateProduct = () => {
  const isValid = validateForm();
  if (isValid) {
    const payload = getDataForm();
    axios({
      url: `${BASE_URL}/${productUpdateId}`,
      method: "PUT",
      data: payload,
    })
      .then(({ data }) => {
        showMessage("Đã cập nhật lại sản phẩm");
        fetchProductList();
        $("#myModal").modal("hide");
        console.log("🚀isValid---->", isValid);
      })
      .catch((err) => {
        console.log("🚀err---->", err);
      });
  }
};
