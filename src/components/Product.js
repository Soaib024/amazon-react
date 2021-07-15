import getSymbolFromCurrency from "currency-symbol-map";
import { StarIcon } from "@heroicons/react/solid";
import { useContext } from "react";
import CartContext from "../store/CartContext";

import hasPrime from '../images/hasPrime.png'
import { useHistory } from 'react-router';

const Product = ({ product, key }) => {
  const history = useHistory();
  const cartContext = useContext(CartContext);
  const addToCart = () => {
    cartContext.addItem(product);
  };

  const alreadyInCart = () => {
    const index = cartContext.products.findIndex(
      (tempProduct) => tempProduct._id === product._id
    );
    return index >= 0;
  };


  return (
 
      <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-md shadow-md h-144 items-center" onClick={() => history.push(`/product/${product._id}`)} key={key}>
        <p className="absolute top-2 right-2 text-xs italic text-gray-400 link" onClick={(e) => {e.stopPropagation(); history.push(`/products/category=${product.category}`)}}>
          {product.category}
        </p>

        <img
          src={product.image}
          loading="lazy"
          className="object-contain"
          alt="product"
          style={{ height: "200px", width: "200px" }}
        ></img>
        <h4 className="my-3 line-clamp-3">{product.title}</h4>
        <div className="flex">
          {Array(product.rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500"></StarIcon>
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-2">{product.description}</p>
        <div className="mb-5">
          {getSymbolFromCurrency("INR")} {Math.round(product.price)}
        </div>
        {product.hasPrime && (
          <div className="flex items-center space-x-2 mt-5">
            <img
              className="w-12"
              src={hasPrime}
              alt="hasPrime"
            ></img>
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
        {!alreadyInCart() && (
          <button
            className="mt-auto button w-60 text-center mx-auto"
            onClick={(e) => {
              e.stopPropagation();
              addToCart()
            }}
          >
            {" "}
            Add to Cart
          </button>
        )}
        {alreadyInCart() && (
          <div onClick={(e) => {
            e.stopPropagation();
            history.push('/cart')
          }} className="button mt-auto w-60 text-center mx-auto">
            Go to Card
          </div>
        )}
      </div>

  );
};

export default Product;
