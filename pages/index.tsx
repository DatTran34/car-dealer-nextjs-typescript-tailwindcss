import Head from 'next/head'
import Image from 'next/image'
import HomePage from '../components/HomePage/HomePage'
import Navbar from '../components/Navbar/Navbar'
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { IBrand, ICar } from '../components/Types/model'
import ErrorPage from "next/error";
import { db } from '../config/firebase';
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
import { useState, useEffect } from 'react';
import {motion} from "framer-motion"
import Banner from '../components/HomePage/Banner'
const carCollection = collection(db,'carlist');

const Home: NextPage<{cars: ICar[] , brands: IBrand[]}> = props => {
  if (!props.cars && !props.cars) {
    return <ErrorPage statusCode={404} />;
  }
  const cars : ICar[] = props.cars;
  const brands : IBrand[] = props.brands;
  const [loading,setLoading] = useState<boolean>(false);

  return (
    <motion.div 
      initial={{y:"100%"}}
      animate={{y: "0%"}}
      transition={{duration: 0.25, ease: "easeOut"}}
      exit={{y:"100%"}}
      className='h-screen snap-y snap-mandatory overflow-scroll'
      >
      <Head>
        <title>Car Dealer</title>
      </Head>
      <div className='snap-start h-screen'>
        <Navbar cars={cars} brands={brands}/>
        <Banner/>
      </div>
        <main className="">
        {loading ? (
          <div>
            <h2>Loading</h2>
          </div>
        ) : (
          <HomePage cars={cars} />
        )}
      </main>
    </motion.div>
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

  const brandsCollection = collection(db, 'brand-list');
  let brands: IBrand[] = await getDocs(brandsCollection)
    .then((data) => {
      return data.docs.map((brand) => {
        let brand_: IBrand = brand.data() as IBrand
        return { ...brand_, id: brand.id }
      });
    })


  return {
    props: { cars , brands},
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
