import { useState, useEffect, Fragment, useContext } from "react";

import { loadProductsForHomepage } from "../api/ProductAPI";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProductFeed from "../components/ProductFeed";
import SidebarContext from "../store/SidebarContext";
import Footer from "../components/Footer";


function Home() {
  const [error, setError] = useState(false);
  const sidebarContext = useContext(SidebarContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProductsForHomepage()
      .then((res) => {
        if (res.products) {
          setProducts(res.products);
        }
      })
      .catch((err) => setError(err));
  }, []);


  return (
    <Fragment>
    {sidebarContext.sidebarVisible &&  <Sidebar></Sidebar>}
      <Header></Header>
      <main className="max-w-screen-2xl mx-auto">
        <Banner></Banner>
        <ProductFeed products={products} isHome={true}></ProductFeed>
      </main>
      <Footer></Footer>
    </Fragment>
  );
}

export default Home;
