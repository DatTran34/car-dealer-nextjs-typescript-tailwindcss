import React from "react";
import Image from "next/image";
import Banner from "./Banner";
import ProductFeed from "./ProductFeed";
import { ICar } from "../Types/model";
import ProductContainer from "./ProductContainer";

function HomePage({cars}: {cars:ICar[]}) {
  return (
    <div className="">
      <ProductContainer cars={cars} brand="Chevrolet" color="black"/>
      <ProductContainer cars={cars} brand="BMW" color="white"/>
    </div>
  );
}




export default HomePage;
