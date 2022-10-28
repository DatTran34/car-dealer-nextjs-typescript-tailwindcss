
import Head from 'next/head'
import Image from 'next/image'
import HomePage from '../components/HomePage/HomePage'
import Navbar from '../components/Navbar'
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ICar } from '../components/Types/model'
import ErrorPage from "next/error";
const Home: NextPage<{ cars: ICar[] }> = props => {
  if (!props.cars) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className='bg-[#F1F3F4]'>
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar/>
      <main className='max-w-screen-2xl mx-auto'>
      <HomePage cars={props.cars}/>
      </main>
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://myfakeapi.com/api/cars/")
  const obj: any = await res.json()
  const cars: ICar[] = await [...obj.cars];
  return {
    props: {
      cars,
    }
  }
}
export default Home
