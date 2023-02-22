import axios from "axios";

const baseUrl = "https://restoran.pythonanywhere.com";

// Get all products
export const getProducts = async () =>
  await axios.get(`${baseUrl}/products/`).then((res) => res);

// Get single product
export const getOneProduct = async (id) => {
  const { queryKey } = id;
  return await axios
    .get(`${baseUrl}/product/${queryKey[1]}/`)
    .then((res) => res);
};

// Post product
export const postProduct = async (data) => {
  return await axios
    .post(`${baseUrl}/product/create/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);
};

// Update product
export const updateProduct = async ({ id, ...productData }) =>
  await axios
    .patch(`${baseUrl}/product/update/${id}/`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);

// Delete product
export const deleteProduct = async (id) => {
  if (window.confirm("Are you sure deleting this product?")) {
    return await axios
      .delete(`${baseUrl}/product/delete/${id}/`)
      .then((res) => res);
  }
};
