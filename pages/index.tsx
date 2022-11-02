import Head from 'next/head'
import Image from 'next/image'
import HomePage from '../components/HomePage/HomePage'
import Navbar from '../components/Navbar'
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ICar } from '../components/Types/model'
import ErrorPage from "next/error";
import data from "../components/Types/data.json"
import { db } from '../config/firebase';
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
import { useState, useEffect } from 'react';

const carCollection = collection(db,'carlist');

const Home: NextPage<{cars: ICar[] }> = props => {
  if (!props.cars) {
    return <ErrorPage statusCode={404} />;
  }
  const cars : ICar[] = props.cars;
  const [loading,setLoading] = useState<boolean>(false);

  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto">
        {loading ? (
          <div>
            <h2>Loading</h2>
          </div>
        ) : (
          <HomePage cars={cars} />
        )}
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
export default Home
