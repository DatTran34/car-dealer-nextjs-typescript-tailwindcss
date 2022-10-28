import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { ICar } from '../components/Types/model'
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
const ProductPage = () => {

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className='bg-[#F1F3F4]'>
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className='max-w-screen-2xl mx-auto'>
        <div className='p-4 bg-light-blue grid lg:grid-cols-2 items-center'>
          <div className='bg-pink-200'>
            <div className=' '>
              <div>
                <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {[1, 2, 3, 4, 5].map((car, idx) => (
                  <SwiperSlide style={{ border: "2px solid red" }}>
                    <img src="https://cdn.imagin.studio/getImage?&customer=copyright-imaginstudio&make=volvo&modelFamily=c40&paintId=pspc0014&fileType=webp&angle=23&aspectRatio=1.6&zoomType=fullscreen&width=1600&v3=true&margins=0" />
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
                {[1, 2, 3, 4, 5].map((car, idx) => (
                  <SwiperSlide style={{ border: "2px solid #39C7A5", borderRadius: "20px" }}>
                    <img src="https://cdn.imagin.studio/getImage?&customer=copyright-imaginstudio&make=volvo&modelFamily=c40&paintId=pspc0014&fileType=webp&angle=23&aspectRatio=1.6&zoomType=fullscreen&width=1600&v3=true&margins=0" />
                  </SwiperSlide>
                ))}

              </Swiper>
              </div>
              
            </div>
          </div>
          <div className='bg-pink-200'>sdf</div>
        </div>
      </main>

    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch("https://myfakeapi.com/api/cars/")
//   const obj: any = await res.json()
//   const cars: ICar[] = await [...obj.cars];
//   return {
//     props: {
//       cars,
//     }
//   }
// }

export default ProductPage