import React from 'react'
import { IBrand, ICar } from '../components/Types/model'
import ErrorPage from "next/error";
import { GetServerSideProps } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Head from 'next/head';
import Navbar from "../components/Navbar/Navbar";
function contactUs({ cars, brands }: { cars: ICar[], brands: IBrand[] }) {
  if (!cars && !brands) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar cars={cars} brands={brands} />
      <main className="max-w-screen-2xl mx-auto py-4">
        <form className="contact-form" >
          <input type="hidden" name="contact_number" />
          <label>Name</label>
          <input type="text" name="from_name" />
          <label>Email</label>
          <input type="email" name="from_email" />
          <label>Subject</label>
          <input type="text" name="subject" />
          <label>Message</label>
          <textarea name="html_message" />
          <input type="submit" value="Send" />
        </form>
      </main>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {

  const carsCollection = collection(db, 'car-list');

  let cars: ICar[] = await getDocs(carsCollection)
    .then((data) => {
      return data.docs.map((car) => {
        let car_: ICar = car.data() as ICar
        return { ...car_, id: car.id }
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
    props: { cars, brands },
  };
};
export default contactUs