import { createContext } from "react";

const CartContext = createContext({
  products: [],
  productCounts: [],
  totalPrice: 0,
  inititialize: () => {},
  clearCart: () => {},
  addItem: (product) => {},
  removeItem: (id) => {},
  updateCount: (product, count) => {},
});

export default CartContext;
