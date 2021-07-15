import { Fragment, useContext, useEffect, useState } from "react";
import { fetchOrders } from "../api/UserApi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Order from "../components/Order";
import Sidebar from "../components/Sidebar";
import AuthContext from "../store/AuthContext";
import SidebarContext from "../store/SidebarContext";

const Orders = () => {
  const authContext = useContext(AuthContext);
  const sidebarContext = useContext(SidebarContext);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(undefined);
  const numPage = Math.ceil(authContext.user.orders.length / 5);
  useEffect(() => {
    fetchOrders(authContext.token, page)
      .then((res) => {
        if (res.orders) {
          setOrders(res.orders);
        }
      })
      .catch((err) => setError(err));
  }, [page, authContext.token]);

  const updatePageHandler = () => {
    fetchOrders(authContext.token, page)
      .then((res) => {
        if (res.orders) {
          setOrders(res.orders);
        }
      })
      .catch((err) => setError(err));
  };

  const prevPage = () => {
    setPage(page - 1);
    updatePageHandler();
  };

  const nextPage = () => {
    setPage(page + 1);
    updatePageHandler();
  };
  return (
    <Fragment>
      {error && <p>Something went wrong</p>}
      {sidebarContext.sidebarVisible &&  <Sidebar></Sidebar>}
      <Header></Header>
      <main className="max-w-2xl mx-auto ">
        <p className="text-xl border-b border-yellow-500 py-3 text-gray-600">
          Your Orders
        </p>
        {orders.map((order) => (
          <Order order={order} key={order._id}></Order>
        ))}
      </main>
      <div className="max-w-2xl mx-auto flex justify-center space-x-2 p-4 text-gray-500 ">
        {page > 1 && (
          <div onClick={prevPage} className="link">
            prev
          </div>
        )}
        {orders.length > 0 && <div>{page}</div>}
        {orders.length === 0 && <div className="p-7 text-lg">No Orders to Show</div>}
        {numPage > 0 && page < numPage && (
          <div onClick={nextPage} className="link">
            next
          </div>
        )}
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default Orders;
