import Head from "next/head";
import React, { useState } from "react";
import ErrorPage from "next/error";
import { GetServerSideProps } from "next";
import Navbar from "../../components/Navbar";
import { IBrand, ICar } from "../../components/Types/model";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"; // for adding the Document to Collection
import { db } from "../../config/firebase"; // firestore instance
import InputForm from "../../components/AdminPage/InputForm";
import { useRouter } from 'next/router'

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

        console.log("start-to-add-2");
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

  const addCar = async () => {
    // get the current timestamp
    console.log("start-to-add");
    // structure the car data
    const carData = {
      ...newCar,
    };
    await addBrandToFirebase()
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
