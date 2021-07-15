import { CheckCircleIcon } from "@heroicons/react/solid";
import getSymbolFromCurrency from "currency-symbol-map";
import { useContext } from "react";

import CartContext from "../store/CartContext";
import AuthContext from "../store/AuthContext";
import { Link } from "react-router-dom";
const CartRight = ({checkout}) => {
  const cartContext = useContext(CartContext)
  const authContext = useContext(AuthContext)

  return <div className=" mt-4 mb-4 sm:col-span-2 ">
    <div className="p-4 mb-4 space-y-4 rounded-md shadow-lg bg-white ">
      <p>100% Purchase Protection</p>
      <p>Original products | Secure Payments</p>
    </div>
    <div className="p-4 mb-4 rounded-md shadow-lg bg-white space-y-4">
      {cartContext.totalPrice > 499 && <CheckCircleIcon className="text-green-700 w-6 inline-block"></CheckCircleIcon>}
      {cartContext.totalPrice > 499 && <p className="inline-block">Your order is eligible for FREE Delivery.</p>}
    
      <p>Subtotals ({cartContext.productCounts.reduce((a, b) => a + b, 0)} items): {getSymbolFromCurrency('INR')} {cartContext.totalPrice}</p>
      {authContext.isSignedIn && <button onClick={checkout} className="button rounded-xl w-8/12 shadow-md">Proceed to Buy</button>}
      {!authContext.isSignedIn && <Link to="/auth" className="button rounded-xl w-8/12 shadow-md">Login to continue</Link>}
      
    </div>
  </div>;
};

export default CartRight;
