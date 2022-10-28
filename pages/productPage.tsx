import Head from "next/head";
import Navbar from "../components/Navbar";
import { ICar } from "../components/Types/model";
import React from "react";
import { useState } from "react";
import AccordionProduct from "../components/ProductPage/AccordionProduct";
import SwiperProduct from "../components/ProductPage/SwiperProduct";

import type { GetServerSideProps } from "next";

const ProductPage = ({ cars }: { cars: ICar[] }) => {
  const [car, setCar] = useState<ICar>(cars[0]);

  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto py-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
            <SwiperProduct />
            <div className="bg-white rounded-lg h-full p-4">
              <div className="text-4xl">
                {car.car} {car.car_model}
              </div>
              <div>
                {car.price.slice(1,car.price.length - 1)}
              </div>
            </div>
          </div>
          <AccordionProduct />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://myfakeapi.com/api/cars/");
  const obj: any = await res.json();
  const cars: ICar[] = await [...obj.cars];
  return {
    props: {
      cars,
    },
  };
};

export default ProductPage;