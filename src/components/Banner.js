import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import c1 from '../images/c1.jpg'
import c2 from '../images/c2.jpg'
import c3 from '../images/c3.jpg'

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute z-20 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0"></div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        <img loading="lazy" src={c1} alt="" />
        <img loading="lazy" src={c2} alt="" />
        <img loading="lazy" src={c3} alt="" />
        <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonDevices/2019/HeroMarch21/Range_D-1x._CB669480912_.jpg" alt="" />
        <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Fashion/Event/Jan-ART/Gateway/Clearance/ATF/V2/ClearanceStore_GW_PCBunk_50._CB662280195_.jpg" alt="" />
        <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Avatar/HeroPC_1500x600_CBCC._CB667391209_.jpg" alt="" />
        <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2021/desktop-1x._CB658860139_.jpg" alt="" />
      </Carousel>
    </div>
  );
};

export default Banner;
