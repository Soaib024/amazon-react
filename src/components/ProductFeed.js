import Product from "./Product";
import banner1 from '../images/b1.jpg'

const ProductFeed = ({ products, isHome }) => {
  return (
    <div className={`grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${isHome && 'md:-mt-32'} mx-auto`}>
      {products.slice(0, 4).map((product) => (
        <Product key={product.id} product={product}></Product>
      ))}

      <img
        className="md:col-span-full"
        src={banner1}
        alt=""
      />
      <div className="md:col-span-2 ">
        {products.slice(4, 5).map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
      {products.slice(5).map((product) => (
        <Product key={product.id} product={product}></Product>
      ))}
    </div>
  );
};

export default ProductFeed;
