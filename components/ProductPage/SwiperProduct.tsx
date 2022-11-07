import React from 'react'
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { ICar } from "../Types/model";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { colors } from '../Types/data';

function SwiperProduct({ car }: { car: ICar }) {

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  // const [angle, setAngle] = useState("01")
  const angles = ["01","05","09", "13", "17","21","22", "23","27", "29"]

  return (
    <div className='w-full'>
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {angles.map((angle, idx) => (
          <SwiperSlide key={idx}>
            <img
              className="object-contain"
              src={`https://cdn.imagin.studio/getImage?&customer=copyright-imaginstudio&make=${car.model_make_id}&modelFamily=${car.model_name}&paintId=${colors[car.model_color]}&fileType=webp&angle=${angle}&aspectRatio=1.6&zoomType=fullscreen&width=1600&v3=true&margins=0`}
              alt="carImage"
            />
          </SwiperSlide>
        ))}


      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {angles.map((angle, idx) => (
          <SwiperSlide key={idx}>
            <img
              className="object-contain"
              src={`https://cdn.imagin.studio/getImage?&customer=copyright-imaginstudio&make=${car.model_make_id}&modelFamily=${car.model_name}&paintId=${colors[car.model_color]}&fileType=webp&angle=${angle}&aspectRatio=1.6&zoomType=fullscreen&width=1600&v3=true&margins=0`}
              alt="carImage"
            />
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  )
}

export default SwiperProduct