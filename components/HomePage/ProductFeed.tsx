
import ProductContainer from "./ProductContainer";
import { ICar } from "../Types/model";
import DealsContainer from "./DealsContainer";


function ProductFeed({ cars }: { cars: ICar[] }) {
  return (
    <div className="py-4 px-4 2xl:px-0 flex flex-col space-y-4">
        {/* <DealsContainer/> */}
        <ProductContainer cars={cars} brand="Chevrolet"/>
        <ProductContainer cars={cars} brand="Cadillac"/>
        <ProductContainer cars={cars} brand="BMW"/>
        <ProductContainer cars={cars} brand="Audi"/>
    </div>
  );
}

export default ProductFeed;
