import React from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICar } from "../Types/model";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

function ProductContainer({ cars }: { cars: ICar[] }) {
  return (
    <div className="bg-white rounded-lg p-6 space-y-2">
      <div>
        <div className="flex flex-row justify-between">
          <h4 className="text-lg">Accordition Title</h4>
          <h3 className="text-gray-400">See more</h3>
        </div>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {cars.slice(0, 10).map((car, i) => (
          <SwiperSlide>
            <ProductCard car={car} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductContainer;
