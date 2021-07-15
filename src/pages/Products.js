import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadProducts } from "../api/ProductAPI";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import Sidebar from "../components/Sidebar";
import SidebarContext from "../store/SidebarContext";

const Products = () => {
  let { query } = useParams();
  const sidebarContext = useContext(SidebarContext);
  const [page, setpage] = useState(1);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProducts(query)
      .then((res) => {
        if (res.products) {
          setProducts(res.products);
        }
      })
      .catch((err) => console.log(err));
  }, [page, query]);
  return (
    <div>
      {sidebarContext.sidebarVisible &&  <Sidebar></Sidebar>}
      <Header></Header>
      <ProductFeed products={products}></ProductFeed>
      <Footer></Footer>
      
    </div>
  );
};

export default Products;
