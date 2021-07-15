import { BrowserRouter as Router, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Home from "./pages/Home";
import orders from "./pages/Orders";
import Success from "./pages/Success";

import { AuthProvider } from "./store/AuthProvider";
import CartProvider from "./store/CartProvider";
import SidebarProvider from "./store/SidebarProvider";
import Product from "./pages/Product";
import Order from "./pages/Order";


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <SidebarProvider>
            <Route path="/" exact component={Home}></Route>
            <Route path="/auth" exact component={Auth}></Route>
            <Route path="/cart" exact component={Cart}></Route>
            <Route path="/success" exact component={Success}></Route>
            <Route path="/orders" exact component={orders}></Route>
            <Route path="/products/:query" exact component={Products}></Route>
            <Route path="/product/:id" exact component={Product}></Route>
            <Route path="/order" exact component={Order}></Route>
          </SidebarProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
