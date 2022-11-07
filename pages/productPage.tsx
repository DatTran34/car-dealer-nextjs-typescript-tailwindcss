import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import { IBrand, ICar } from "../components/Types/model";
import React, { useEffect } from "react";
import { useState } from "react";
import AccordionProduct from "../components/ProductPage/AccordionProduct";
import SwiperProduct from "../components/ProductPage/SwiperProduct";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import ErrorPage from "next/error";
import { Button } from "@material-tailwind/react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  getDoc,
  doc,
  getDocs
} from "@firebase/firestore";
import { colors_name } from "../components/Types/data";
import {motion} from "framer-motion"

const ProductPage = ({ cars ,brands , query_id }: { cars: ICar[], brands: IBrand[] , query_id : string }) => {
  if (!cars && !brands && !query_id) {
    return <ErrorPage statusCode={404} />;
  }
  const car : ICar = cars.filter((car) => {
    if (car.id === query_id) {
      console.log(car)
      return car
    }
  })[0] as ICar
  
  function numberWithCommas(x : number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  return (
    <motion.div 
    initial={{y:"100%"}}
    animate={{y: "0%"}}
    transition={{duration: 0.75, ease: "easeOut"}}
    exit={{y:"100%"}}>
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar cars={cars} brands={brands} />
      <main className="max-w-screen-2xl mx-auto py-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
            <SwiperProduct car={car} />
            <div className="bg-[#ffffff] rounded-md px-5 py-10 space-y-5 h-full">
              <div className="flex flex-rows items-center justify-between text-3xl">
                <div className="text-[#39C7A5]">
                  {car.model_make_id} {car.model_name}
                </div>
                <div className="text-3xl ">
                  ${numberWithCommas(Number(car.model_price.toFixed(0)))}
                </div>
              </div>
              <div className="flex flex-rows items-center justify-between ">
                <div>
                  <div className="text-sm text-[#bdbdbd]">Year</div>
                  <div>{car.model_year}</div>
                </div>
                <div>
                  <div className="text-sm text-[#bdbdbd]">Mileage</div>
                  <div>{car.model_mileage}</div>
                </div>
                <div>
                  <div className="text-sm text-[#bdbdbd]">Body Type</div>
                  <div>{car.model_body}</div>
                </div>
                <div>
                  <div className="text-sm text-[#bdbdbd]">Transmission</div>
                  <div>{car.model_transmission_type}</div>
                </div>
              </div>
              <div>
                <div className="flex flex-cols items-center justify-between ">
                  <div className="text-sm text-[#bdbdbd]">VIN number</div>
                  <div>{car.model_vin}</div>
                </div>
                <div className="flex flex-cols items-center justify-between ">
                  <div className="text-sm text-[#bdbdbd]">Drive Wheels</div>
                  <div>{car.model_drive}</div>
                </div>
                <div className="flex flex-cols items-center justify-between ">
                  <div className="text-sm text-[#bdbdbd]">Exterior Color</div>
                  <div>{colors_name[car.model_color]}</div>
                </div>
              </div>
              <Button variant="gradient" color="blue">
                Contact Us
              </Button>
            </div>
          </div>
          <AccordionProduct car={car} />
        </div>
      </main>
    </motion.div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query_id: string = context.query.id as string;
  // const carsCollection = doc(db, "car-list", id);

  // try {
  //   const docSnap = await getDoc(carsCollection);
  //   if (docSnap.exists()) {
  //     return {
  //       props: { car: docSnap.data()},
  //     };
  //   } else {
  //     console.log("Document does not exist");
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  const carsCollection = collection(db ,'car-list');

  let cars: ICar[] = await getDocs(carsCollection)
  .then((data) => {
    return data.docs.map((car) => {
          let car_ : ICar = car.data() as ICar
          return {...car_, id : car.id}
      });
  })


  const brandsCollection = collection(db, 'brand-list');
  let brands: IBrand[] = await getDocs(brandsCollection)
    .then((data) => {
      return data.docs.map((brand) => {
        let brand_: IBrand = brand.data() as IBrand
        return { ...brand_, id: brand.id }
      });
    })


  return {
    props: {cars, brands, query_id},
  };
};
export default ProductPage;
