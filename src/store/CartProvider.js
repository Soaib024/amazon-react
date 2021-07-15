import { useReducer } from "react";
import { pushCartChangesToServer } from "../api/UserApi";
import CartContext from "./CartContext";

const defaultCartState = {
  products: [],
  productCounts: [],
  totalPrice: 0,
  inititialize:() => {},
  clearCart:() => {},
  addItem: (product) => {},
  removeItem: (id) => {},
  updateCount: (product, count) => {},
};


const computeTotalPrice = (productArray, productCounts) => {
  let totalSum = 0;
  for(let i = 0; i < productArray.length; i++){
    totalSum += productArray[i].price * productCounts[i];
  }
  return totalSum;
}

const persistCart = async (state) => {
  if(localStorage.getItem("jwt") !== undefined){
    const token = JSON.parse(localStorage.getItem("jwt")).token;
    const products = JSON.stringify(state.products);
    const productCounts = JSON.stringify(state.productCounts);
    const totalPrice = state.totalPrice;
  
    const oldUser = JSON.parse(localStorage.getItem("jwt"));
    oldUser.user.products= products;
    oldUser.user.productCounts = productCounts;
    oldUser.user.totalPrice = totalPrice;
    localStorage.setItem("jwt", JSON.stringify(oldUser));


    const body= {
      token : token,
      products: products,
      productCounts: productCounts,
      totalPrice: totalPrice,
    }
    await pushCartChangesToServer(body)
  }
}

const cartReducer = (state, action) => {

  if(action.type === "INIT"){
    return action.cart
  }
  
  if (action.type === "ADD") {
    const newCart = {
      products: [...state.products, action.product],
      productCounts: [...state.productCounts, 1],
      totalPrice: state.totalPrice + action.product.price * 1,
    };

    persistCart(newCart)
    return newCart;
  }

  if (action.type === "UPDATE") {
    const index = state.products.findIndex(
      (product) => product._id === action.product._id
    );

    state.productCounts[index] = action.count * 1;
    state.totalPrice = computeTotalPrice(state.products, state.productCounts)
    
    persistCart(state)
    return {...state};
  }

  if (action.type === "REMOVE") {
    const index = state.products.findIndex(
      (product) => product._id === action.product._id
    );
  
    state.products = state.products.filter((product, i) => i !== index)
    state.productCounts =  state.productCounts.filter((product, i) => i !== index)
    state.totalPrice = computeTotalPrice(state.products, state.productCounts)
    persistCart(state)
    return {...state};
  }

  if(action.type === "CLEAR"){
    state.products = [];
    state.productCounts = [];
    state.totalPrice = 0;
    persistCart(state);
    return {...state}
  }


  
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const initHandler = (cart) => {
    dispatchCartAction({type: "INIT", cart: cart})
  }

  const clearHandler = () => {
    dispatchCartAction({type: "CLEAR"});
  }

  const addItemHandler = (product) => {
    dispatchCartAction({ type: "ADD", product: product });
  };

  const updateCountHandler = (product, count) => {
    dispatchCartAction({ type: "UPDATE", product: product, count: count });
  };

  const removeItemhandler = (product) => {
    dispatchCartAction({ type: "REMOVE", product: product});
  };

  const cartContext = {
    products: cartState.products,
    totalPrice: cartState.totalPrice,
    productCounts: cartState.productCounts,
    inititialize: initHandler,
    clear: clearHandler,
    addItem: addItemHandler,
    removeItem: removeItemhandler,
    updateCount: updateCountHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
