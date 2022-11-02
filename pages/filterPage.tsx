import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterBox from "../components/ProductPage/FilterBox";
import type { GetServerSideProps } from "next";
import { ICar } from "../components/Types/model";
import ProductCard from "../components/HomePage/ProductCard";
import {
  initializeModelList,
  initializeBrandList,
  filterSelectedModelOptions,
  filterSelectedBarndOptions,
  filterSelectedSortByOptions,
} from "../components/FilterPage/FilterFunctioning";

import { db } from "../config/firebase";

import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";



function filterPage({cars} : {cars: ICar[]}) {

  const [loading,setLoading] = useState<boolean>(false);

  // Selected Options
  const [selectedModelOption, setSelectedModelOption] = useState<string>("");
  const [selectedBrandOption, setSelectedBrandOption] = useState<string>("");
  const [selectedSortByOption, setSelectedSortByOption] = useState<string>("");

  // A List of Cars after filtering
  //const [cars,setCars] = useState<ICar[]>([]);
  const [filteredCars, setFilteredCars] = useState<ICar[]>();

  // Lists of Options to Filter
  const [brandList, setBrandList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const sortByList = ["Low To High", "High To Low"]

  useEffect( () => {
    setFilteredCars(cars)
    setBrandList(initializeBrandList(cars));
 },[]);

  useEffect(() => {
    //Filter brand option updated so apply all filters here
    let result = cars!;
    if (selectedBrandOption !== "") {
      result = filterSelectedBarndOptions(result, selectedBrandOption);
      //setFilteredCars(result);
      setModelList(initializeModelList(result));
      setSelectedSortByOption("");
      setSelectedModelOption("");
      console.log("update brand list")
    }
    if (selectedModelOption !== "") {
      //let result = filteredCars!;
      result = filterSelectedModelOptions(result, selectedModelOption);
     //setFilteredCars(result);
      console.log("update model list")
    }
    if (selectedSortByOption !== "") {
      let result = filteredCars!;
      result = filterSelectedSortByOptions(result, selectedSortByOption);
      
    }
    console.log(selectedBrandOption,selectedModelOption,selectedSortByOption,)
    setFilteredCars(result);
  }, [selectedBrandOption,selectedModelOption,selectedSortByOption]);

  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto py-4">
        {loading ? (
        <div className="text-center">
        <div role="status">
            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
        ):
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FilterBox
              title="Category"
              optionList={brandList}
              setFilter={setSelectedBrandOption}
            />
            <FilterBox
              title="Model"
              optionList={modelList}
              setFilter={setSelectedModelOption}
            />
            <FilterBox
              title="Sort By"
              optionList={sortByList}
              setFilter={setSelectedSortByOption}
            />
          </div>
          <div className="bg-white rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredCars?.map((car, idx) => (
              <ProductCard car={car} key={idx} />
            ))}
          </div>
        </div>}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const carsCollection = collection(db ,'car-list');

  let cars: ICar[] = await getDocs(carsCollection)
  .then((data) => {
    return data.docs.map((car) => {
          let car_ : ICar = car.data() as ICar
          return {...car_, id : car.id}
      });
  })

  return {
    props: {cars}
  }
}






// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch("https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims").then(response => response.text())
//   .then((response) => {
//       return response
//   })
//   .catch(err => console.log(err))

// //const data:string = res!
// const bigData: ICar[] = await JSON.parse(res!.slice(11,res!.length - 3))
// const cars = [...bigData].sort(() => 0.5 - Math.random()).slice(0, 100);
// // console.log(data)
// //const cars: any = "23"//await JSON.parse(data);
// return {
//   props: {
//     cars,
//   },
// };
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch("https://myfakeapi.com/api/cars/");
//   const obj: any = await res.json();
//   const cars: ICar[] = await [...obj.cars];
//   return {
//     props: {
//       cars,
//     },
//   };
// };

export default filterPage;
