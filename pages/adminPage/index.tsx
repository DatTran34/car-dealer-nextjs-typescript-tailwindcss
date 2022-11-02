import { collection, getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { EditIcon, TrashIcon } from "../../components/Icon";
import Navbar from "../../components/Navbar";
import { ICar } from "../../components/Types/model";
import { db } from "../../config/firebase";
import ErrorPage from "next/error";
import { Button } from "@material-tailwind/react";
import FilterBox from "../../components/ProductPage/FilterBox";

function list({ cars }: { cars: ICar[] }) {
      if (!cars) {
        return <ErrorPage statusCode={404} />;
      }
  const titleList = [
    "model_make_display",
    "model_name",
    "model_year",
    "model_mileage"
  ];


  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto p-4">
        <div className="space-y-5">
          <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FilterBox title="Category" optionList={[]} />
            <FilterBox title="Model" optionList={[]} />
            <FilterBox title="Sort By" optionList={[]} />
            <Link
              href={{
                pathname: "/adminPage/upload",
              }}
            >
              <Button className="w-full">Add a new Car</Button>
            </Link>
          </div>
          <div className="w-full grid grid-cols-3 md:grid-cols-5 text-sm text-left bg-white">
            {/* {titleList.map((title, idx) => (
              <div key={idx} className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">
                {title}
              </div>
            ))} */}
            <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">Model Make Display</div>
            <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">Model Name</div>
            <div className="col-span-1 hidden md:block border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">Model Year</div>
            <div className="col-span-1 hidden md:block border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">Model Mileage</div>
            <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">Action</div>
            {cars.slice(0, 10).map((car, idx) => {
              return (
                <>
                  {/* {titleList.map((titleList, idx) => (
                    <div key={idx} className="col-span-1 border-t-2 border-[#aaa] py-4 px-6">
                      {car[titleList]}
                    </div>
                  ))} */}
            <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 ">{car["model_make_display"]}</div>
            <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 ">{car["model_name"]}</div>
            <div className="col-span-1 hidden md:block border-t-2 border-[#aaa] py-3 px-6 ">{car["model_year"]}</div>
            <div className="col-span-1 hidden md:block border-t-2 border-[#aaa] py-3 px-6 ">{car["model_mileage"]}</div>
                  <div className="col-span-1 border-t-2 border-[#aaa] py-4 px-6 flex flex-row">
                    <div className="cursor-pointer">
                      <Link
                        href={{
                          pathname: "/adminPage/edit",
                          query: { id: car.id }, // the data
                        }}
                      >
                        <EditIcon />
                      </Link>
                    </div>
                    <div className="cursor-pointer">
                      <TrashIcon />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div>
            <div>Prev</div>
            <div>Next</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const carsCollection = collection(db, "car-list");

  let cars: ICar[] = await getDocs(carsCollection).then((data) => {
    return data.docs.map((car) => {
      let car_: ICar = car.data() as ICar;
      return { ...car_, id: car.id };
    });
  });

  return {
    props: { cars },
  };
};

export default list;
