import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { ICar } from "../components/Types/model";
import React from "react";
import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import AccordionProduct from "../components/ProductPage/AccordionProduct";

const ProductPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="grid lg:grid-cols-2">
            <div className="bg-pink-200">sdf</div>
            <div className="bg-pink-200">sdf</div>
          </div>
          <AccordionProduct />
        </div>
      </main>
    </div>
  );
};

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

export default ProductPage;
