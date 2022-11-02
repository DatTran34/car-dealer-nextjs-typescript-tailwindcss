import { ICar } from "../Types/model";

  // Make the list of brand options to filter
  export const initializeBrandList = (data: ICar[]) => {
    return Array.from(
      new Set(
        data.map((car, idx) => {
          return car.model_make_display;
        })
      )
    );
  };

  export const initializeModelList = (data: ICar[]) => {
    return Array.from(
        new Set(
            data.map((car, idx) => {
            return car.model_name;
          })
        )
      );
  }

  // Handle filter function
  export const filterSelectedBarndOptions = (array: ICar[], option: string) => {
    return array.filter((item) => item.model_make_display === option);
  };

  export const filterSelectedModelOptions = (array: ICar[], option: string) => {
    return array.filter((item) => item.model_name === option);
  };

  export const filterSelectedSortByOptions = (array: ICar[], option: string) => {
      return array
      // if(option === "Low To High")
      // {
      //   return array.sort((a,b) => {return (parseFloat(a.price.slice(1,a.price.length - 1)) - parseFloat(b.price.slice(1,b.price.length - 1)))});
      // }
      // else {
      //   return array.sort((a,b) => {return (parseFloat(a.price.slice(1,a.price.length - 1)) - parseFloat(b.price.slice(1,b.price.length - 1)))}).reverse();
      
      // }
     };