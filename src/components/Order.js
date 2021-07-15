import getSymbolFromCurrency from "currency-symbol-map";
import { useHistory } from 'react-router';


const Order = ({ order }) => {
  const history = useHistory();
  const orderItems = JSON.parse(order.products);
  const orderDate = new Date(order.createdAt);
  return (
    <div className="my-10" onClick={() => {
      history.push({
        pathname: "/order",
        state: order
      })
    }}>
      <div className="bg-gray-100 rounded-md grid grid-cols-8 text-xs px-3 py-4 text-gray-500 border">
        <div className="col-span-2">
          <p>ORDER PLACED</p>
          <p>{`${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getFullYear()}`}</p>
        </div>
        <div className="col-span-2">
          <p>TOTAL</p>
          <p>
            {getSymbolFromCurrency("inr")} {order.amount}
          </p>
        </div>
        <div className="col-span-4 text-right">
          <p>Order ID</p>
          <p>{order._id}</p>
        </div>
      </div>
      <div className="border rounded-md px-3 py-4 text-gray-500 mt-1">
        <p className="text-xs py-3">Payment Status: {order.payment_status}</p>
        <div className="flex">
          {orderItems.map((orderItem, i) => (
            i < 2 && <img key={i}
              className="px-2 h-32 object-contain"
              src={orderItem.price_data.product_data.images[0]}
              alt="order-item"
            />
          ))}
          <p className="flex items-center">{orderItems.length - 2 > 0 && <span> + {orderItems.length - 2} others</span>} </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
