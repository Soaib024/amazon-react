import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { useHistory } from "react-router";
import { checkoutHandler } from "../api/UserApi";
import CartLeft from "../components/CartLeft";
import CartRight from "../components/CartRight";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthContext from "../store/AuthContext";
import CartContext from "../store/CartContext";
import SidebarContext from "../store/SidebarContext";

const stripePromise = loadStripe("pk_test_51IzCQ1SB6xVY9FmUjetWYz53zpPz0xll3UIx4HBQieHKVd7uQE5PAkjlZYPuccSglJpv9S0zpVhcHC6IaqlDu2to00rCSVAe8O");

const Cart = () => {
  const cartContext = useContext(CartContext)
  const authContext = useContext(AuthContext);
  const sidebarContext = useContext(SidebarContext);
  const history = useHistory();
  const checkout = async () => {
    const stripe = await stripePromise;
    if(!authContext.isSignedIn){
      return history.push("/auth");
    }

    const products = cartContext.products;
    const productCount = cartContext.productCounts;

    const checkoutSession = await checkoutHandler(authContext.token, products, productCount);
    const session = await checkoutSession.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if(result.error){
      console.log("something went wrong")
    }
  }

  return (
    <div>
      {sidebarContext.sidebarVisible &&  <Sidebar></Sidebar>}
      <Header></Header>
      <main className="flex flex-col-reverse bg-gray-100 pt-10 px-4 sm:grid grid-cols-6">
        <CartLeft></CartLeft>
        <CartRight checkout={checkout}></CartRight>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Cart;
