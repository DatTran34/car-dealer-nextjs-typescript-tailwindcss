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

function filterPage({ cars }: { cars: ICar[] }) {
  // Selected Options
  const [selectedModelOption, setSelectedModelOption] = useState<string>("");
  const [selectedBrandOption, setSelectedBrandOption] = useState<string>("");
  const [selectedSortByOption, setSelectedSortByOption] = useState<string>("");

  // A List of Cars after filtering
  const [filteredCars, setFilteredCars] = useState<ICar[]>(cars);

  // Lists of Options to Filter
  const [brandList, setBrandList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const sortByList = ["Low To High", "High To Low"]

  useEffect(() => {
    setBrandList(initializeBrandList(cars));
  }, [cars]);


  useEffect(() => {
    //Filter brand option updated so apply all filters here
    if (selectedBrandOption !== "") {
      let result = cars;
      result = filterSelectedBarndOptions(result,selectedBrandOption);
      setFilteredCars(result);
      setModelList(initializeModelList(result));
      setSelectedSortByOption("")
    }
  }, [selectedBrandOption]);

  useEffect(() => {
    //Filter model option updated so apply all filters here
    if (selectedModelOption !== "") {
      let result = filteredCars;
      result = filterSelectedModelOptions(result,selectedModelOption);
      setFilteredCars(result);
      setSelectedSortByOption("")
    }
  }, [selectedModelOption]);

  useEffect(() => {
    //Filter model option updated so apply all filters here
    if (selectedSortByOption !== "") {
        console.log("asd")
      let result = filteredCars;
      result = filterSelectedSortByOptions(result,selectedSortByOption);
      console.log(result)
      setFilteredCars(result);
    }
  }, [selectedSortByOption]);
console.log(selectedSortByOption)
  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto py-4">
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
            {filteredCars.map((car, idx) => (
              <ProductCard car={car} key={idx} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://myfakeapi.com/api/cars/");
  const obj: any = await res.json();
  const cars: ICar[] = await [...obj.cars];
  return {
    props: {
      cars,
    },
  };
};

export default filterPage;
