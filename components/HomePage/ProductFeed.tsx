import React from "react";
import ProductContainer from "./ProductContainer";
import { ICar } from "../Types/model";
import DealsContainer from "./DealsContainer";


function ProductFeed({ cars }: { cars: ICar[] }) {
  return (
    <div className="p-4 flex flex-col space-y-4 mx-auto">
        {/* <DealsContainer/> */}
        <ProductContainer cars={cars}/>
        <ProductContainer cars={cars}/>
    </div>
  );
}

export default ProductFeed;
