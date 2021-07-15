import logo from "../images/amazon_PNG11.png";

const Footer = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="bg-amazon_blue-light w-full">
      <p onClick={backToTop} className="text-white text-center link py-3">Back to top</p>
      <div className="bg-amazon_blue">
          <img src={logo} alt="logo" className="w-20 pt-3 mx-auto"></img>
          <div className="text-white flex space-x-5 text-xs pb-3 justify-center">
              <p>Conditions of Use & Sale</p>
              <p>Privacy Notice</p>
              <p>Interest-Based Ads</p>
              <p>&copy; 1996-2021, Amazon.com, Inc. or its affiliates </p>
          </div>
      </div>
  
    </div>
  );
};

export default Footer;