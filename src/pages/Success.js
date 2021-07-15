import { CheckCircleIcon } from "@heroicons/react/outline";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CartContext from "../store/CartContext";
import SidebarContext from "../store/SidebarContext";

function Success() {
  const history = useHistory();
  const sidebarContext = useContext(SidebarContext);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    cartContext.clear();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      {sidebarContext.sidebarVisible &&  <Sidebar></Sidebar>}
      <Header></Header>
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10"></CheckCircleIcon>
            <h1 className="text-3xl">
              Thank you, your order has been confirmed
            </h1>
          </div>
          <p>
            Thank you for shopping with us. we'll send a confirmation once your
            item has shipped. if you like to check the status of your orders(s)
            please press the link below.
          </p>
          <button
            className="button mt-8"
            onClick={() => history.push("/orders")}
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
