import { XIcon } from "@heroicons/react/outline";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import SidebarContext from "../store/SidebarContext";

const Overlay = () => {
  const sidebarContext = useContext(SidebarContext);
  const hideSidebarHandler = () => {
    sidebarContext.hideSidebar();
  };
  return (
    <div
      className="fixed top-0 left-0 right-0  z-40 w-screen h-screen bg-black bg-opacity-80"
      onClick={hideSidebarHandler}
    ></div>
  );
};

const ASide = () => {
  const userContext = useContext(AuthContext);
  const sidebarContext = useContext(SidebarContext);
  const signoutHandler = () => {
    userContext.signOut();
    localStorage.removeItem("jwt");
  };

  const hideSidebarHandler = () => {
    sidebarContext.hideSidebar();
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-9/12 h-screen bg-white space-y-4 p-4 overflow-scroll md:w-1/4 lg:text-lg">
      <div className=" bg-amazon_blue text-white fixed top-0 left-0 flex justify-between w-9/12 md:w-1/4 p-4">
        <p>
          Hello,{" "}
          {userContext.isSignedIn ? (
            userContext.user.name
          ) : (
            <Link to="/auth">Sign in</Link>
          )}
        </p>
        <XIcon className="w-7" onClick={hideSidebarHandler}></XIcon>
      </div>
      <div className="sidebar_container pt-10">
        <p className="sidebar_conatiner_heading ">Trending</p>
        <p className="sidebar_container_link">Best Seller</p>
        <p className="sidebar_container_link">New Releases</p>
        <p className="sidebar_container_link">Movers and Shakers</p>
      </div>

      <div className="sidebar_container">
        <p className="sidebar_conatiner_heading">Digital Content And Devices</p>
        <p className="sidebar_container_link">Echo & Alexa</p>
        <p className="sidebar_container_link">Fire Tv</p>
        <p className="sidebar_container_link">Kindle E-Reader & eBook</p>
        <p className="sidebar_container_link">Audible Audiobooks</p>
        <p className="sidebar_container_link">Amazon Prime Video</p>
        <p className="sidebar_container_link">Amazon Prime Music</p>
      </div>

      <div className="sidebar_container">
        <p className="sidebar_conatiner_heading">Shop By Departments</p>

        <Link to="/products/category=mobile&category=laptop">
          <p className="link sidebar_container_link">Mobiles, Computers</p>
        </Link>
        <Link to="/products/category=tv&category=appliances&category=electronics">
          <p className="link sidebar_container_link">
            TV, Appliances, Electronics
          </p>
        </Link>
        <Link to="/products/category=mens%20clothing">
          <p className="link sidebar_container_link">Men's Fashion</p>
        </Link>
        <Link to="/products/category=womens%20clothing">
          <p className="link sidebar_container_link">Women's Fashion</p>
        </Link>
        <Link to="/products/category=home&category=kitchen&category=pets">
          <p className="link sidebar_container_link">Home, Kitchen, Pets</p>
        </Link>
        <Link to="/products/category=beauty&category=health&category=grocery">
          <p className="link sidebar_container_link">Beauty, Health, Grocery</p>
        </Link>
        <Link to="/products/category=sports&category=fitness&category=bags&category=luggage">
          <p className="link sidebar_container_link">
            Sports, Fitness, Bags, Luggage
          </p>
        </Link>
        <Link to="/products/category=toys&category=baby&category=kids">
          <p className="link sidebar_container_link">
            Toys, Baby products, Kid's Fashion
          </p>
        </Link>
        <Link to="/products/category=car&category=motorbike&category=industrials">
          <p className="link sidebar_container_link">
            Car, Motorbike, Industrial
          </p>
        </Link>
        <Link to="/products/category=books">
          <p className="link sidebar_container_link">Books</p>
        </Link>
        <Link to="/products/category=movie&category=music&category=video%20games">
          <p className="link sidebar_container_link">
            Movies, Music, & Video Games
          </p>
        </Link>
      </div>

      <div className="sidebar_container">
        <p className="sidebar_conatiner_heading">Help & Settings</p>
        <p className="link sidebar_container_link">Your Account</p>
        {userContext.isSignedIn ? (
          <p className="link sidebar_container_link" onClick={signoutHandler}>
            Sign Out
          </p>
        ) : (
          <Link to="/auth">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

const Sidebar = () => {
  return (
    <Fragment>
      <Overlay></Overlay>
      <ASide></ASide>
    </Fragment>
  );
};

export default Sidebar;
