import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Button, Input } from "@material-tailwind/react";
import { GetServerSideProps } from "next";
import { ICar } from "../../components/Types/model";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
var vinGenerator = require("vin-generator");
import ErrorPage from "next/error";
import { doc } from "@firebase/firestore"; // for creating a pointer to our Document
import { setDoc, addDoc, collection } from "firebase/firestore"; // for adding the Document to Collection
import { db } from "../../config/firebase"; // firestore instance

function adminPage({ cars }: { cars: ICar[] }) {
  if (!cars) {
    return <ErrorPage statusCode={404} />;
  }
  const [error, setError] = useState<string>(""); // error
  const [message, setMessage] = useState<string>(""); // message

  const [newCar, setNewCar] = useState<ICar>(cars[0]); // title

  const handleOnChangeNewCar = (key: string, value: string) => {
    const car_ = { ...newCar, [key]: value };
    setNewCar({ ...newCar, ...car_ });
  };

  const data = [
    {
      label: "Upload Car",
      value: "1",
    },
    {
      label: "Edit Car",
      value: "2",
    },
    {
      label: "Analysis",
      value: "3",
    },
    {
      label: "Order",
      value: "4",
    },
  ];


  const submit = async () => {
      cars.map(async (car_,idx)=>{
          await addCar(car_);
      })
      console.log("added successfully");
  }
 
  const addCar = async (car:ICar) => {
    // get the current timestamp
    console.log("start-to-add");
    // structure the car data
    const carData = {
      ...car
    };
    try {
      //add the Document
      console.log("start-to-add-2");
      await addDoc(collection(db, "car-list"), carData);
      //show a success message
      setMessage("New car added successfully");
      console.log("New car added successfully");
      //reset fields
      //setTitle("");
      //setDescription("");
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
        <Tabs value="1">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            <TabPanel key={"1"} value={"1"}>
              <div className="bg-white rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-6 md:grid-cols-6 gap-4">
                  {Object.keys(newCar).map((key, index) => {
                    return (
                      <div
                        key={index}
                        className="col-span-3 md:col-span-2 space-y-4"
                      >
                        <div>{key.replace(/_/g, " ")}</div>
                        <div className="w-full">
                          <Input
                            defaultValue={newCar[key]}
                            onChange={(e) => {
                              handleOnChangeNewCar(key, e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full flex flex-row justify-end space-x-4">
                  <Button
                    className="flex-1 md:flex-none"
                    variant="gradient"
                    color="blue"
                    onClick={() => {
                      submit();
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    className="flex-1 md:flex-none"
                    variant="outlined"
                    color="blue"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    "https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims"
  )
    .then((response) => response.text())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));

  //const data:string = res!
  const bigData: ICar[] = await JSON.parse(res!.slice(11, res!.length - 3));
  var cars = [...bigData].sort(() => 0.5 - Math.random()).slice(0, 100);
  // console.log(data)
  //const cars: any = "23"//await JSON.parse(data);

  cars = cars.map((car, index) => {
    var randomVin = vinGenerator.generateVin();
    var mileage =
      (2023 - car.model_year) * Math.floor(1000 + Math.random() * 9000);
    var color = ["Black", "Silver", "White", "Gray", "Brown"];
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
    return {
      model_vin: randomVin,
      model_mileage: mileage,
      model_color: color[Math.floor(Math.random() * color.length)],
      ...car,
    };
  });

  return {
    props: {
      cars,
    },
  };
};

export default adminPage;

