import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct } from "../api/ProductAPI";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CartContext from "../store/CartContext";
import getSymbolFromCurrency from "currency-symbol-map";
import { StarIcon } from "@heroicons/react/solid";
import Sidebar from "../components/Sidebar";
import SidebarContext from "../store/SidebarContext";

const Product = () => {
  const { id } = useParams();
  const cartContext = useContext(CartContext);
  const [product, setProduct] = useState(undefined);
  const [error, setError] = useState(undefined);
  const sidebarContext = useContext(SidebarContext);

  const addToCart = () => {
    cartContext.addItem(product);
  };

  const alreadyInCart = () => {
    const index = cartContext.products.findIndex(
      (tempProduct) => tempProduct._id === product._id
    );
    return index >= 0;
  };
  useEffect(() => {
    fetchProduct(id).then((res) => {
      if (res.status === "success") {
        setProduct(res.product);
        setError(undefined);
      } else {
        setError(res.message);
        setProduct(undefined);
      }
    });
  }, [id]);
  return (
    <div className="h-screen flex flex-col">
      {sidebarContext.sidebarVisible && <Sidebar></Sidebar>}
      <Header></Header>
      {error && <p>{error}</p>}

      {product && (
        <div className="flex w-screen  justify-around flex-grow">
          <div className="flex flex-col sm:flex-row w-full sm:max-w-4xl justify-center items-center sm:space-x-12">
            <div className="sm:w-1/2">
              <img
                src={product.image}
                className=" p-10 sm:w-2/3 sm:max-h-96 object-contain"
                alt=""
              />
            </div>

            <div className="p-10 sm:space-y-9 sm:w-1/2 ">
              <p>{product.title}</p>
              <div className="flex">
                {Array(product.rating)
                  .fill()
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 text-yellow-500"
                    ></StarIcon>
                  ))}
              </div>
              <p className="py-5">
                {getSymbolFromCurrency("inr")} {product.price}
              </p>
              {!alreadyInCart() && (
                <button
                  className=" button w-60 text-center mx-auto"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              )}
              {alreadyInCart() && (
                <Link to="/cart">
                  <button className="button w-60 text-center mx-auto">
                    Go to Card
                  </button>
                </Link>
              )}
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae pariatur in repellendus ad error quisquam quos
                dolorem, vitae, eligendi qui numquam? Maxime nam animi aliquid,
                quibusdam quis illo fugit temporibus.
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default Product;
