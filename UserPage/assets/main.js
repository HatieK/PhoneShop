const BASE_URL = "https://62b6eabe6999cce2e80a17ba.mockapi.io/api/cart";

const fetchProducts = () => {
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(({ data }) => {
      renderProductList(data);
      handleGetData(data);
    })
    .catch((error) => {
      console.log("🚀error---->", error);
    });
};
fetchProducts();

const fetchProductId = (productId) => {
  axios({
    url: `${BASE_URL}/${productId}`,
    method: "GET",
  })
    .then(({ data }) => {
      handleProductInCart(data);
    })
    .catch((error) => {
      console.log("🚀error---->", error);
    });
};

// const fetchDeleteProduct = (productId) => {
//   axios({
//     url: `${BASE_URL}/${productId}`,
//     method: "DELETE",
//   })
//     .then(({ data }) => {
//       deleteProduct(data);
//     })
//     .catch((error) => {
//       console.log("🚀error---->", error);
//     });
// };
