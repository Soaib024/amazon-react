import { StarIcon } from "@heroicons/react/solid";
import getSymbolFromCurrency from "currency-symbol-map";
import { useContext } from "react";
import CartContext from "../store/CartContext";

import { QuantitySelector } from "./QuantitySelector";
import hasPrime from '../images/hasPrime.png'

const CartProduct = ({ product, quantity }) => {

  const cartContext = useContext(CartContext);

  const removeProductHandler = (e) => {
    e.preventDefault();
    cartContext.removeItem(product);
  }
  return (
    <div className="grid text-sm grid-cols-9 border-b-2 py-4">
      <img
        src={product.image}
        alt="cart-product"
        className="object-fit w-32 col-span-3"
      />
      <div className="col-span-4 text-gray-700 flex flex-col items-start justify-between">
        <p className="text-gray-800 tracking-wide text-xl line-clamp-2 font-light">
          {product.title}
        </p>
        <div className="flex">
          {Array(product.rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500"></StarIcon>
            ))}
        </div>
        {product.hasPrime && (
          <p className="text-gray-300 text-xs font-thin">
            Eligible for FREE Shipping
          </p>
        )}

        {product.hasPrime && (
          <img
            className="w-12"
            src={hasPrime}
            alt="hasPrime"
          ></img>
        )}
        <p className="text-sm line-clamp-3 text-gray-600 font-thin">
          {product.description}
        </p>
        <div className="space-x-5" >
        <QuantitySelector selected={quantity} product={product}></QuantitySelector>
        <button onClick={removeProductHandler}>Delete</button>
        </div>
        
      </div>
      <p className="col-span-2 text-right text-gray-500">
        {getSymbolFromCurrency("INR")} {product.price} { quantity > 1 && <span>{" x "} {quantity} = {product.price * quantity}</span>}
      </p>
    </div>
  );
};

export default CartProduct;
