import { ICar } from "../Types/model";

  // Make the list of brand options to filter
  export const initializeBrandList = (data: ICar[]) => {
    return Array.from(
      new Set(
        data.map((car, idx) => {
          return car.car;
        })
      )
    );
  };

  export const initializeModelList = (data: ICar[]) => {
    return Array.from(
        new Set(
            data.map((car, idx) => {
            return car.car_model;
          })
        )
      );
  }

  // Handle filter function
  export const filterSelectedBarndOptions = (array: ICar[], option: string) => {
    return array.filter((item) => item.car === option);
  };

  export const filterSelectedModelOptions = (array: ICar[], option: string) => {
    return array.filter((item) => item.car_model === option);
  };

  export const filterSelectedSortByOptions = (array: ICar[], option: string) => {
      if(option === "Low To High")
      {
        return array.sort((a,b) => {return (parseFloat(a.price.slice(1,a.price.length - 1)) - parseFloat(b.price.slice(1,b.price.length - 1)))});
      }
      else {
        return array.sort((a,b) => {return (parseFloat(a.price.slice(1,a.price.length - 1)) - parseFloat(b.price.slice(1,b.price.length - 1)))}).reverse();
      
      }
     };