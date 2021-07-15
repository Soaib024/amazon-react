import { useContext, useState } from "react";
import CartContext from "../store/CartContext";

export const QuantitySelector = ({ selected, product }) => {
  const cartContext = useContext(CartContext);
  const [value, setValue] = useState(selected);

  const quantityChangeHandler = (e) => {
    setValue(e.target.value);
    cartContext.updateCount(product, e.target.value * 1);
  };
  return (
    <select
      value={value}
      className="border px-2 py-1 rounded-lg bg-gray-200 shadow-md"
      onChange={quantityChangeHandler}
    >
      <option value="1">Qty: 1</option>
      <option value="2">Qty: 2</option>
      <option value="3">Qty: 3</option>
      <option value="4">Qty: 4</option>
      <option value="5">Qty: 5</option>
    </select>
  );
};
