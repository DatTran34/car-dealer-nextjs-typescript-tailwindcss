import Head from "next/head";
import React, { useState } from "react";
import ErrorPage from "next/error";
import { GetServerSideProps } from "next";
import Navbar from "../../components/Navbar";
import { ICar } from "../../components/Types/model";
import { addDoc, collection, getDocs } from "firebase/firestore"; // for adding the Document to Collection
import { db } from "../../config/firebase"; // firestore instance
import InputForm from "../../components/AdminPage/InputForm";
import { useRouter } from 'next/router'

function adminPage({ cars }: { cars: ICar[] }) {
  console.log(cars);
  if (!cars) {
    return <ErrorPage statusCode={404} />;
  }
  const [error, setError] = useState<string>(""); // error
  const [message, setMessage] = useState<string>(""); // message
  const router = useRouter()
  const [newCar, setNewCar] = useState<ICar>(cars[0]); // title

  const handleOnChangeNewCar = (key: string, value: string) => {
    const car_ = { ...newCar, [key]: value };
    setNewCar({ ...newCar, ...car_ });
  };

  // const submit = async () => {
  //   cars.map(async (car_, idx) => {
  //     await addCar(car_);
  //   });
  //   console.log("added successfully");
  // };

  const addCar = async () => {
    // get the current timestamp
    console.log("start-to-add");
    // structure the car data
    const carData = {
      ...newCar,
    };
    try {
      //add the Document
      console.log("start-to-add-2");
      await addDoc(collection(db, "car-list"), carData);
      //show a success message
      setMessage("New car added successfully");
      console.log("New car added successfully");
      router.push("/adminPage/list")
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
        <InputForm car={newCar} handleOnChangeCar={handleOnChangeNewCar} submit={addCar} title="UPLOAD NEW CAR"/>
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
    props: {
      cars,
    },
  };
};

export default adminPage;
