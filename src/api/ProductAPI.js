import { API } from "../backend";

export const loadProducts = async (query) => {
  const response = await fetch(`${API}/products?${query}`);
  return await response.json();
};

export const loadProductsForHomepage = async () => {
  const response = await fetch(`${API}/products/home`);
  return await response.json();
};

export const searchProduct = async (pattern, query) => {
  const response = await fetch(`${API}/products/search/${pattern}?${query}`);
  return await response.json();
};

export const fetchProduct = async (id) => {
  const response = await fetch(`${API}/products/${id}`);
  return await response.json();
}
