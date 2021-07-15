import { useContext } from "react";
import CartContext from "../store/CartContext";
import CartProduct from "./CartProduct";

const CartLeft = () => {
  const cartContext = useContext(CartContext);
  
  return (
    <div className="bg-white m-4 p-4 text-xl font-bold border sm:col-span-4 rounded-md shadow-lg">
      <h1 className="text-2xl text-thin border-b-2 py-4">Shopping Cart</h1>

      <div className="py-4">
        {cartContext.products.map(((product, index) => (
          <CartProduct
            product={product}
            quantity={cartContext.productCounts[index]}
            key={product._id}
          ></CartProduct>
        )))}
      </div>
    </div>
  );
};

export default CartLeft;
