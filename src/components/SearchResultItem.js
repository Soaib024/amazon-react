import { Link } from "react-router-dom";

const SearchResultItem = ({ result }) => {
  return (
    <div className="flex mb-3">
      <div className="w-1/12">
        <img
          src={result.image}
          alt=""
          className="h-8 object-contain inline-block mr-2"
        />
      </div>
      <div className="w-11/12 flex justify-between ">
          <Link to={`/product/${result._id}`} className="link"><p className="line-clamp-1"> {result.title}</p></Link>
          <Link to={`/products/category=${result.category}`}><span className="link">{result.category}</span></Link>
      </div>
    </div>
  );
};

export default SearchResultItem;
