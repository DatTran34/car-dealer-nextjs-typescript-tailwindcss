import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICar } from "../Types/model";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Pagination } from "swiper";
// import required modules
import { Navigation } from "swiper";
import { ArrowLeft, ArrowRight } from "../Icon";
import Link from "next/link";

function ProductContainer({ cars, brand }: { cars: ICar[]; brand: string }) {
  const swiperRef = useRef<SwiperCore>();
  return (
    <div className="relative py-4 px-8 lg:p-10 rounded-lg space-y-2 bg-[#fff]">
      <div>
        <div className="flex flex-row justify-between">
          <h4 className="text-lg">{brand}</h4>
          <h3 className="text-gray-400">
            <Link
              href={{
                pathname: "/filterPage",
                query: { brand: brand }, // the data
              }}
            >
              <div>See more</div>
            </Link>
          </h3>
        </div>
      </div>
      <div className="relative">
        <button
          className="absolute inset-y-1/2 -left-5 z-4"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeft />
        </button>
        <button
          className="absolute inset-y-1/2 -right-5 z-4"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRight />
        </button>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          grabCursor={true}
          className="mySwiper"
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            720: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {cars.map((car, i) => {
            if (car.model_make_id === brand) {
              return (
                <SwiperSlide key={i}>
                  <ProductCard car={car} />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ProductContainer;
