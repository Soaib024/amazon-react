import { Link } from "react-router-dom";

import logo from '../images/amazon_PNG11.png'

import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../store/CartContext";
import AuthContext from "../store/AuthContext";
import { fetchUserFromLocalStorage } from "../helpers/helpers";
import SidebarContext from "../store/SidebarContext";
import { searchProduct } from "../api/ProductAPI";
import SearchResultItem from "./SearchResultItem";

let timer;
const Header = () => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const sidebarContext = useContext(SidebarContext);
  const [searchResult, setSearchResult] = useState(undefined);

  const showSidebarHandler = () => {
    sidebarContext.showSidebar();
  };

  const searchHandler = (e) => {
    const target = e.target;
    clearTimeout(timer);

    timer = setTimeout(() => {
      const value = target.value.trim();
      if (value === "") {
        setSearchResult(undefined);
      } else {
        searchProduct(value, "limit=8&page=1").then((res) => {
          setSearchResult(res.results);
        });
      }
    }, 1000);
  };

  useEffect(() => {
    const localUser = fetchUserFromLocalStorage();
    if (localUser !== undefined) {
      const localCart = {
        products: JSON.parse(localUser.user.products),
        productCounts: JSON.parse(localUser.user.productCounts),
        totalPrice: JSON.parse(localUser.user.totalPrice),
      };
      authContext.signIn(localUser);
      cartContext.inititialize(localCart);
    }
  }, []);
  return (
    <Fragment>
      <header>
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
          <Link
            to="/"
            className="mt-2 flex items-center flex-grow sm:flex-grow-0"
          >
            <img
              src={logo}
              alt="logo"
              className="w-36 h-10 object-contain cursor-pointer"
            />
          </Link>
          <div className="hidden sm:flex items-center h-10 rounded-md cursor-pointer flex-grow bg-yellow-400 hover:bg-yellow-500">
            <input
              type="text"
              className="w-6 rounded-l-md flex flex-grow p-2 h-full focus:outline-none px-4"
              onKeyDown={searchHandler}
            />
            <SearchIcon className="h-14 p-4"></SearchIcon>
          </div>
          <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
            <div>
              {authContext.isSignedIn && <p>Hello {authContext.user.name}</p>}
              {!authContext.isSignedIn && (
                <Link to="/auth">Hello, Sign in</Link>
              )}
              <p className="font-extrabold md:text-sm">Account & list</p>
            </div>
            <Link to="/orders">
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">Orders</p>
            </Link>
            <Link to="/cart" className="relative flex items-center">
              <span className="absolute top-0 right-0 md:right-8 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                {cartContext.productCounts.reduce((a, b) => a + b, 0)}
              </span>
              <ShoppingCartIcon className="h-10"></ShoppingCartIcon>
              <p className="hidden md:inline">Cart</p>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-smflex-grow py-2">
          <p className="link flex items-center" onClick={showSidebarHandler}>
            <MenuIcon className="h-6 mr-1"></MenuIcon>All
          </p>
          <p className="">Prime video</p>
          <p className="">Amazon business</p>
          <p className="">Today's deal</p>
          <Link to="/products/category=mobile&category=laptop">
            <p className="hidden lg:inline-flex">Electronics</p>
          </Link>
          <p className="hidden lg:inline-flex">Food & Grocery</p>
          <p className="hidden lg:inline-flex">Prime</p>
          <p className="hidden lg:inline-flex">Buy Again</p>
          <p className="hidden lg:inline-flex">Shopper Toolkit</p>
          <p className="hidden lg:inline-flex">Health & Personal Care</p>
        </div>
      </header>
      {searchResult && (
        <div className="absolute top-24 left-0 right-0  mx-auto z-40 rounded-md p-5   mt-4 max-w-4xl text-sm text-gray-600 border border-gray-200 shadow-xl bg-white ">
          {searchResult.length > 0 &&
            searchResult.map((result) => (
              <SearchResultItem
                key={result._id}
                result={result}
              ></SearchResultItem>
            ))}
          {searchResult.length === 0 && <p>No results found</p>}
        </div>
      )}
    </Fragment>
  );
};

export default Header;
