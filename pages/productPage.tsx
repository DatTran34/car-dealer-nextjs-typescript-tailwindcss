import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { ICar } from '../components/Types/model'
import React, { Fragment, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button 
} from "@material-tailwind/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
const ProductPage = () => {

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };
  return (
    <div className='bg-[#F1F3F4]'>
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className='max-w-screen-2xl mx-auto'>
        <div className='p-4  grid lg:grid-cols-2 items-center gap-x-5'>
          <div className=''>
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
                    <SwiperSlide style={{ }}>
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
          <div className='bg-white rounded-md px-5 py-10 space-y-5 h-full'>
            <div className='text-3xl'> 2020 Kia Optima </div>
            <div className='flex flex-col items-start justify-start w-2/5 '>
              <div className='flex flex-row space-x-4'>
                <div className='text-2xl text-[#39C7A5]'>$29,995</div>
                <div className='bg-[#EF4C41] text-base text-white py-1 px-2 rounded-md'>SAVE $100</div>
              </div>
              <div className='text-base text-[#777C91]'>Was $299</div>
            </div>
            <div className='text-sm'>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div className='grid grid-cols-2'>
              <div>Used</div>
              <div>32,450 miles</div>
              <div>Automatic</div>
              <div>21 mpg</div>
              <div>Gasoline</div>
              <div>Gray</div>
            </div>
            <Button variant="gradient" color="blue">Contact Us</Button>
          </div>
        </div>
        <div className="bg-white rounded-md p-5" >
          <Fragment>
            <Accordion open={open === 1} animate={customAnimation}>
              <AccordionHeader onClick={() => handleOpen(1)}>
              Specifications
              </AccordionHeader>
              <AccordionBody>
                <div className='grid grid-cols-4'>
                  <div>Exterior Color</div>
                  <div className='text-[#777C91]'>Wolf Gray</div>
                  <div>Interior Color</div>
                  <div className='text-[#777C91]'>Black</div>
                  <div>Odometer</div>
                  <div className='text-[#777C91]'>44749</div>
                  <div>Transmission</div>
                  <div className='text-[#777C91]'>Automatic</div>
                  <div>Driveline</div>
                  <div className='text-[#777C91]'>Front Wheel Drive</div>
                  <div>Fuel Type</div>
                  <div className='text-[#777C91]'>Gasoline Fuel</div>
                  <div>Engine </div>
                  <div className='text-[#777C91]'>4</div>
                  <div>Fuel Economy </div>
                  <div className='text-[#777C91]'>27/37 MPG City/Hwy</div>
                  <div>Stock </div>
                  <div className='text-[#777C91]'>HE047024</div>
                  <div>VIN </div>
                  <div className='text-[#777C91]'>JTEZU5JR8J5185159</div>
                  <div>Body/Seating</div>
                  <div className='text-[#777C91]'>GT-Line Auto FWD/5 seats</div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} animate={customAnimation}>
              <AccordionHeader onClick={() => handleOpen(2)}>
                Specifications
              </AccordionHeader>
              <AccordionBody>
                <div className='grid grid-cols-4'>
                  <div>Exterior Color</div>
                  <div>Wolf Gray</div>
                  <div>Interior Color</div>
                  <div>Black</div>
                  <div>Transmission</div>
                  <div>Automatic</div>
                  <div>Engine </div>
                  <div>4</div>
                  <div>Fuel Economy </div>
                  <div>27/37 MPG City/Hwy</div>
                  <div>Stock </div>
                  <div>HE047024</div>
                  <div>VIN </div>
                  <div>JTEZU5JR8J5185159</div>
                  <div>Body/Seating</div>
                  <div>GT-Line Auto FWD/5 seats</div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 3} animate={customAnimation}>
              <AccordionHeader onClick={() => handleOpen(3)}>
                Highlighted Features
              </AccordionHeader>
              <AccordionBody>
                <div className='grid grid-cols-2'>
                  <div>Navigation system</div>
                  <div>Automatic temperature control</div>
                  <div>Auto high-beam headlights</div>
                  <div>Wireless phone connectivity</div>
                  <div>Exterior parking camera rear</div>
                  <div>Lane departure</div>
                  <div>Front dual zone A/C</div>
                  <div>Split folding rear seat</div>
                </div>
              </AccordionBody>
            </Accordion>
          </Fragment>
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