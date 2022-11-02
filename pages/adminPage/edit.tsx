import {
    Breadcrumbs,
} from "@material-tailwind/react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { ICar } from "../../components/Types/model";
import { db } from "../../config/firebase";
import ErrorPage from "next/error";
import InputForm from "../../components/AdminPage/InputForm";
import { useRouter } from 'next/router'

function edit({ car }: { car: ICar }) {
  if (!car) {
    return <ErrorPage statusCode={404} />;
  }
  const [updatedCar, setUpdatedCar] = useState<ICar>(car);
  const [error, setError] = useState<string>(""); // error
  const [message, setMessage] = useState<string>(""); // message
  const router = useRouter()
  const handleOnChange = (key: string, value: string) => {
    const car_ = { ...car, [key]: value };
    setUpdatedCar({ ...updatedCar, ...car_ });
  };

  const editCar = async () => {
    // structure the car data
    const carData = {
      ...updatedCar,
    };
    try {
        const carsCollection = doc(db, "car-list", car.id);
        updateDoc(carsCollection, carData)
          .then((docRef) => {
            console.log(
              "A New Document Field has been added to an existing document"
            );
            router.push("/adminPage/list")
          })
          .catch((error) => {
            console.log(error);
          });
    } catch (error) {
      //show an error message
      setError("An error occurred while adding new car");
      console.log(error);
    }
  };

  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto p-4">
        <InputForm car={updatedCar} handleOnChangeCar={handleOnChange} submit={editCar} title="EDIT CAR"/>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: string = context.query.id as string;
  const carsCollection = doc(db, "car-list", id);

  try {
    const docSnap = await getDoc(carsCollection);
    if (docSnap.exists()) {
      return {
        props: { car: {...docSnap.data(), id: id} },
      };
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: {},
  };
};

export default edit;


{/* <table className="w-full table-auto text-sm text-left">
<thead className="text-xs uppercase bg-blue-100">
  <tr>
    {titleList.map((title, idx) => (
      <th key={idx} className="py-3 px-6">
        {title}
      </th>
    ))}
    <th className="py-3 px-6">Action</th>
  </tr>
</thead>
<tbody>
  {cars.slice(0, 10).map((car, idx) => (
    <tr key={idx} className="text-gray-600 p-4 bg-white border-b">
      {titleList.map((titleList, idx) => (
        <td key={idx} className="py-4 px-6">
          {car[titleList]}
        </td>
      ))}
      <td className="py-4 px-6 flex flex-row">
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
      </td>
    </tr>
  ))}
</tbody>
</table> 


<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
  <table className="w-full table-auto text-sm text-left">
    <thead className="text-xs uppercase bg-blue-100">
      <tr>
        {titleList.map((title, idx) => (
          <th
            key={idx}
            className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            {title}
          </th>
        ))}
        <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cars.slice(0, 10).map((car, idx) => (
        <tr key={idx} className="">
          {titleList.map((titleList, idx) => (
            <td
              key={idx}
              className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-900 whitespace-no-wrap"
            >
              {car[titleList]}
            </td>
          ))}
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex flex-rows">
            <span className="cursor-pointer relative inline-block px-3 py-3 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">
                {" "}
                <Link
                  href={{
                    pathname: "/adminPage/edit",
                    query: { id: car.id }, // the data
                  }}
                >
                  <EditIcon />
                </Link>
              </span>
            </span>
            <span className="cursor-pointer relative inline-block px-3 py-3 font-semibold text-red-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">
                <TrashIcon />
              </span>
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div> */}