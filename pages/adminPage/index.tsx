import { collection, getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { EditIcon, TrashIcon } from "../../components/Icon";
import Navbar from "../../components/Navbar/Navbar";
import { IBrand, ICar } from "../../components/Types/model";
import { db } from "../../config/firebase";
import ErrorPage from "next/error";
import { Button } from "@material-tailwind/react";
import FilterBox from "../../components/ProductPage/FilterBox";
import { filterSelectedBarndOptions, filterSelectedModelOptions } from "../../components/FilterPage/FilterFunctioning";

function list({ cars , brands }: { cars: ICar[], brands: IBrand[] }) {
  if (!cars && !brands) {
    return <ErrorPage statusCode={404} />;
  }

// Selected Options
const [selectedModelOption, setSelectedModelOption] = useState<string>("");
const [selectedBrandOption, setSelectedBrandOption] = useState<string>("");
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

  const [leftPoint, setLeftPoint] = useState(0)
  const [rightPoint, setRightPoint] = useState(10)

  const handlePrev = () => {
    if(leftPoint !== 0)
    {
      setLeftPoint(leftPoint - 10)
      setRightPoint(rightPoint - 10)
    }
  }

  const handleNext = () => {
    if(rightPoint !== filteredCars.length - 1)
    {
      setLeftPoint(leftPoint + 10)
      setRightPoint(rightPoint + 10)
    }
  }

  return (
    <div className="bg-[#F1F3F4]">
      <Head>
        <title>Car Dealer</title>
      </Head>
      <Navbar cars={cars} brands={brands} />
      <main className="max-w-screen-2xl mx-auto p-4">
        <div className="space-y-5">
          <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">
              Model Make Display
            </div>
            <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">
              Model Name
            </div>
            <div className="col-span-1 hidden md:block border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">
              Model Year
            </div>
            <div className="col-span-1 hidden md:block border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">
              Model Mileage
            </div>
            <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 bg-[#bbdefb]">
              Action
            </div>
            {filteredCars.slice(leftPoint, rightPoint).map((car, idx) => {
              return (
                <>
                  <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 ">
                    {car["model_make_display"]}
                  </div>
                  <div className="col-span-1 border-t-2 border-[#aaa] py-3 px-6 ">
                    {car["model_name"]}
                  </div>
                  <div className="col-span-1 hidden md:block border-t-2 border-[#aaa] py-3 px-6 ">
                    {car["model_year"]}
                  </div>
                  <div className="col-span-1 hidden md:block border-t-2 border-[#aaa] py-3 px-6 ">
                    {car["model_mileage"]}
                  </div>
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
          <div className="px-4 flex flex-row justify-between">
            <div className="text-xs sm:text-sm text-gray-600">Showing {leftPoint} to {rightPoint} of {filteredCars.length} results</div>
            <div className="space-x-2 sm:space-x-4">
              <Button onClick={(e)=> {e.preventDefault(); handlePrev()}}>Prev</Button>
              <Button onClick={(e)=> {e.preventDefault(); handleNext()}}>Next</Button>
            </div>
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

  const brandsCollection = collection(db, 'brand-list');
  let brands: IBrand[] = await getDocs(brandsCollection)
    .then((data) => {
      return data.docs.map((brand) => {
        let brand_: IBrand = brand.data() as IBrand
        return { ...brand_, id: brand.id }
      });
    })

  return {
    props: { cars ,brands },
  };
};

export default list;
