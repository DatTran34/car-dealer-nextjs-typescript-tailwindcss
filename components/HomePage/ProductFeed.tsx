
import ProductContainer from "./ProductContainer";
import { ICar } from "../Types/model";
import DealsContainer from "./DealsContainer";


function ProductFeed({ cars }: { cars: ICar[] }) {
  return (
    <div className="py-4 px-4 2xl:px-0 flex flex-col  space-y-4">
        {/* <DealsContainer/> */}
        <ProductContainer cars={cars} brand="Chevrolet" color="black"/>
        <ProductContainer cars={cars} brand="Chevrolet"/>
    </div>
  );
}

export default ProductFeed;
