import React from "react";
import Image from "next/image";
import Banner from "./Banner";
import ProductFeed from "./ProductFeed";
import { ICar } from "../Types/model";

function HomePage({cars}: {cars:ICar[]}) {
  return (
    <div className="">
      <Banner/>
      <ProductFeed cars={cars}/>
    </div>
  );
}




export default HomePage;
