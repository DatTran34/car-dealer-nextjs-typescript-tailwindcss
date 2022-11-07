import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import FilterBox from "../components/ProductPage/FilterBox";
import type { GetServerSideProps } from "next";
import { IBrand, ICar } from "../components/Types/model";
import ProductCard from "../components/HomePage/ProductCard";
import {
  filterSelectedModelOptions,
  filterSelectedBarndOptions,
  filterSelectedSortByOptions,
} from "../components/FilterPage/FilterFunctioning";

import { db } from "../config/firebase";

import {collection,getDocs} from "@firebase/firestore";
import ErrorPage from "next/error";


function filterPage({cars, brands, query_brand} : {cars: ICar[], brands: IBrand[], query_brand:string}) {
  if (!cars && !brands) {
    return <ErrorPage statusCode={404} />;
  }
  const [loading,setLoading] = useState<boolean>(false);

  // Selected Options
  const [selectedModelOption, setSelectedModelOption] = useState<string>("");
  const [selectedBrandOption, setSelectedBrandOption] = useState<string>(query_brand);
  const [selectedSortByOption, setSelectedSortByOption] = useState<string>("");

  // A List of Cars after filtering
  //const [cars,setCars] = useState<ICar[]>([]);
  const [filteredCars, setFilteredCars] = useState<ICar[]>(cars);

  // Lists of Options to Filter
  //const [brandList, setBrandList] = useState<IBrand[]>(brands);
  //const [modelList, setModelList] = useState<string[]>([]);
  const sortByList = ["Low To High", "High To Low"]


  useEffect(() => {
    let result = cars!;
    if(selectedBrandOption !== ""){
      //const models_ : string[] = brands.filter((brand) => brand.brandName === selectedBrandOption)[0].modelList;
      result = filterSelectedBarndOptions(result, selectedBrandOption);
      //setModelList(models_);
      setSelectedSortByOption("");
      setSelectedModelOption("");
      setFilteredCars(result);
    }
  }, [selectedBrandOption])

  useEffect(() => {
    let result = cars!;
    if (selectedModelOption !== "") {
      result = filterSelectedModelOptions(result, selectedModelOption);
      setFilteredCars(result);
    }

  }, [selectedModelOption])


  const initializeModelList = () => {
     const brand = brands.filter((brand) => brand.brandName === selectedBrandOption)[0]
     if(brand)
     {
       return brand.modelList
     }
      return []
  }

  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar cars={cars} brands={brands} />
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
        ): (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4">
              <FilterBox
                title="Category"
                optionList={brands.map((brand,idx) => {return brand.brandName})}
                selectedFilter= {selectedBrandOption}
                setFilter={setSelectedBrandOption}
              />
              <FilterBox
                title="Model"
                //optionList={brands[selectedBrandOption]}
                optionList={initializeModelList()}
                selectedFilter= {selectedModelOption}
                setFilter={setSelectedModelOption}
              />
              <FilterBox
                title="Sort By"
                optionList={sortByList}
                selectedFilter={selectedSortByOption}
                setFilter={setSelectedSortByOption}
              />
            </div>
            <div className="bg-white rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCars?.map((car, idx) => (
                <ProductCard car={car} key={idx} />
              ))}
            </div>
          </div>
        )
        }
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  var query_brand: string = ""
  
  if(context.query.brand)
  {
    query_brand = context.query.brand as string;
  } 
  var query_model: string = ""
  
  if(context.query.model)
  {
    query_model = context.query.model as string;
  } 

  const carsCollection = collection(db ,'car-list');

  let cars: ICar[] = await getDocs(carsCollection)
  .then((data) => {
    return data.docs.map((car) => {
          let car_ : ICar = car.data() as ICar
          return {...car_, id : car.id}
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
    props: {cars, brands, query_brand}
  }
}

export default filterPage;
