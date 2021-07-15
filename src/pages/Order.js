import getSymbolFromCurrency from "currency-symbol-map";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import SidebarContext from "./../store/SidebarContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Order = () => {
  const location = useLocation();
  const [order, setOrder] = useState(location.state);

  const sidebarContext = useContext(SidebarContext);

  const orderItems = JSON.parse(order.products);
  const orderDate = new Date(order.createdAt);
  const shippingAddress = JSON.parse(order.shipping_address);

  return (
    <div>
      {sidebarContext.sidebarVisible && <Sidebar></Sidebar>}
      <Header></Header>
      <div className="my-10 w-full flex flex-col items-center ">
        <div className="bg-gray-100 rounded-md text-xs text-gray-500 border p-4 w-full max-w-3xl">
          <div className="">
            <p>ORDER PLACED</p>
            <p>{`${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getFullYear()}`}</p>
          </div>
          <div className="">
            <p>TOTAL</p>
            <p>
              {getSymbolFromCurrency("inr")} {order.amount}
            </p>
            <div className="text-gray-600 text-md mt-4">
              <p>{order.name}</p>
              <p>{shippingAddress.line1}</p>
              <p>{shippingAddress.line2}</p>
              <p>
                {shippingAddress.city}
                {", "}
                {shippingAddress.state}
              </p>
              <p>
                {shippingAddress.postal_code}, {shippingAddress.country}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p>Order ID</p>
            <p>{order._id}</p>
          </div>
        </div>
        <div className="border rounded-md  text-gray-500 mt-1 w-full max-w-3xl">
          <p className="text-xs p-4">Payment Status: {order.payment_status}</p>
          <div className="">
            {orderItems.map((orderItem, i) => (
              <div className="flex justify-between border-b p-4 " key={i}>
                <div className="w-1/2 space-y-1">
                  <p className="text-gray-600 text-sm">
                    {orderItem.price_data.product_data.name}
                  </p>
                  <p className="text-xs">Quantity: {orderItem.quantity}</p>
                  <p className="text-xs">
                    {getSymbolFromCurrency("inr")}{" "}
                    {orderItem.price_data.unit_amount / 100}
                  </p>
                </div>
                <img
                  className="h-40 object-contain w-40"
                  src={orderItem.price_data.product_data.images[0]}
                  alt="order-item"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Order;
