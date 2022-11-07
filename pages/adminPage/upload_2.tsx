import Head from "next/head";
import React, { useState } from "react";
import ErrorPage from "next/error";
import { GetServerSideProps } from "next";
import Navbar from "../../components/Navbar/Navbar";
import { IBrand, ICar } from "../../components/Types/model";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"; // for adding the Document to Collection
import { db } from "../../config/firebase"; // firestore instance
import InputForm from "../../components/AdminPage/InputForm";
import { useRouter } from 'next/router'
import { colors_name } from "../../components/Types/data";
var vinGenerator = require("vin-generator");
function adminPage({cars, brands} : {cars: ICar[], brands: IBrand[]}) {

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

  const addBrandToFirebase = async () => {
    const filteredBrand : IBrand = brands.filter(brand => brand.brandName === newCar.model_make_id)[0]
    if (filteredBrand) {
      if (filteredBrand.modelList.filter(model => model === newCar.model_name).length == 0) {

        filteredBrand.modelList.push(newCar.model_name)
        
        try {
          const brandsCollection = doc(db, "brand-list", filteredBrand.id);
          updateDoc(brandsCollection, filteredBrand)
            .then((docRef) => {
              console.log(
                "A New Document Field has been added to an existing document"
              );
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          //show an error message
          setError("An error occurred while adding new car");
          console.log(error);
        }
      }
    }
    else {
      const newBrand = {
        brandName: newCar.model_make_id,
        modelList: Array(1).fill(newCar.model_name),
      }
      try {
        //add the Document

        console.log("start-to-add-brand");
        await addDoc(collection(db, "brand-list"), newBrand);
        //show a success message
        setMessage("New brand added successfully");
        console.log("New brand added successfully");

      } catch (error) {
        //show an error message
        setError("An error occurred while adding new brand");
        console.log(error);
      }
    }
  }

  const submit = async () => {
    await addCar(newCar)
    // cars.map(async (car_, idx) => {
    //   await addCar(car_);
    // });
    console.log("added successfully");
}

  const addCar = async (newCar_ : ICar) => {
    // get the current timestamp
    console.log("start-to-add");
    // structure the car data
    const carData = {
      ...newCar_,
    };
    if(brands)
    {
      await addBrandToFirebase()
    }
    try {
      //add the Document
      console.log("start-to-add-2");
      await addDoc(collection(db, "car-list"), carData);
      //show a success message
      setMessage("New car added successfully");
      console.log("New car added successfully");
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
      <Navbar cars={cars} brands={brands} />
      <main className="max-w-screen-2xl mx-auto p-4">
        <InputForm car={newCar} handleOnChangeCar={handleOnChangeNewCar} submit={submit} title="UPLOAD NEW CAR"/>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const carsCollection = collection(db, "car-list");

  // let cars: ICar[] = await getDocs(carsCollection).then((data) => {
  //   return data.docs.map((car) => {
  //     let car_: ICar = car.data() as ICar;
  //     return { ...car_, id: car.id };
  //   });
  // });

  const keyword_make = "Toyota";
  const keyword_model = "Camry";
  const res = await fetch(
    `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&keyword=${keyword_make}&keyword=${keyword_model}`
  )
    .then((response) => response.text())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));

  //const data:string = res!
  const bigData: ICar[] = await JSON.parse(res!.slice(11, res!.length - 3));
  var cars = [...bigData].sort(() => 0.5 - Math.random()).slice(0, 100);

  cars = cars.map((car, index) => {
    var randomVin = vinGenerator.generateVin();
    var mileage =
      (2023 - car.model_year) * Math.floor(1000 + Math.random() * 9000);

    //Math.floor(Math.random() * (max - min + 1)) + min
    car.model_engine_power_rpm = Math.floor(Math.random() * (5700 - 5500 + 1)) + 5500;
    car.model_engine_torque_rpm = Math.floor(Math.random() * (4300 - 4100 + 1)) + 4100;
    car.model_engine_bore_mm = Math.random() * (110 - 100 + 1) + 100;
    car.model_engine_stroke_mm = Math.random() * (110 - 90 + 1) + 90;;
    car.model_top_speed_kph = Math.floor(Math.random() * (450 - 300 + 1)) + 300;
    car.model_0_to_100_kph = 3.9;
    car.model_seats = 4;
    car.model_weight_kg = Math.floor(Math.random() * (5000 - 4000 + 1)) + 4000;
    car.model_length_mm = Math.floor(Math.random() * (5000 - 4000 + 1)) + 4000;
    car.model_height_mm = Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000;
    car.model_width_mm = Math.floor(Math.random() * (2200 - 1800 + 1)) + 1800;
    car.model_wheelbase_mm = Math.floor(Math.random() * (2600 - 2200 + 1)) + 2200;
    car.model_co2 = Math.floor(Math.random() * (150 - 90 + 1)) + 90;
    car.model_price = 100000 - mileage / (2023 - car.model_year) 
    car.model_make_id = car.model_make_id.charAt(0).toUpperCase() + car.model_make_id.slice(1)
    return {
      ...car,
      
      model_vin: randomVin,
      model_mileage: mileage,
      model_color: Math.floor(Math.random() * colors_name.length),
      
    };
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
    props: {cars, brands}
  }
};

export default adminPage;
