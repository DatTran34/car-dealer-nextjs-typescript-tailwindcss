import Head from "next/head";
import Navbar from "../components/Navbar";
import { ICar } from "../components/Types/model";
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
} from "@firebase/firestore";


const ProductPage = ({ car }: { car: ICar }) => {
  if (!car) {
    return <ErrorPage statusCode={404} />;
  }

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
            <div className="bg-[#ffffff] rounded-md px-5 py-10 space-y-5 h-full">
              <div className="text-3xl">
                {" "}
                {car.model_year} {car.model_make_display} {car.model_name}{" "}
              </div>
              <div className="flex flex-col items-start justify-start w-2/5 ">
                <div className="flex flex-row space-x-4">
                  <div className="text-2xl text-[#39C7A5]">$23,000</div>
                  <div className="bg-[#EF4C41] text-base text-white py-1 px-2 rounded-md">
                    SAVE $100
                  </div>
                </div>
                <div className="text-base text-[#777C91]">Was $299</div>
              </div>
              <div className="text-sm">
                Description: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </div>
              <div className="grid grid-cols-2">
                <div>Used</div>
                <div>32,450 miles</div>
                <div>Automatic</div>
                <div>21 mpg</div>
                <div>Gasoline</div>
                <div>Gray</div>
              </div>
              <Button variant="gradient" color="blue">
                Contact Us
              </Button>
            </div>
          </div>
          <AccordionProduct />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: string = context.query.id as string;
  const carsCollection = doc(db, "car-list", id);

  try {
    const docSnap = await getDoc(carsCollection);
    if (docSnap.exists()) {
      return {
        props: { car: docSnap.data()},
      };
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: { },
  };
};
export default ProductPage;
