import axios from "axios";

const baseUrl = "http://localhost:4000/product";

// Get all products
export const getProducts = async () =>
  await axios.get(baseUrl).then((res) => res);

// Get single product
export const getOneProduct = async (id) => {
  return await axios.get(`${baseUrl}/${id}`).then((res) => res);
};

// Post product
export const postProduct = async (data) => {
  return await axios.post(baseUrl, data).then((res) => res);
};

// Update product
export const updateProduct = async ({ id, ...productData }) =>
  await axios.put(`${baseUrl}/${id}`, productData).then((res) => res);

// Delete product
export const deleteProduct = async (id) => {
  if (window.confirm("Are you sure deleting this product?")) {
    return await axios.delete(`${baseUrl}/${id}`).then((res) => res);
  }
};
