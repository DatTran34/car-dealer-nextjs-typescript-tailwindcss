import { IBrand, ICar } from "../Types/model";
import { db } from "../../config/firebase";

import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
// Make the list of brand options to filter
// export const initializeBrandList = async (data: ICar[]) => {
//   const brandsCollection = collection(db, 'brand-list');
//   let brands: IBrand[] = await getDocs(brandsCollection)
//     .then((data) => {
//       return data.docs.map((brand) => {
//         let brand_: IBrand = brand.data() as IBrand
//         return { ...brand_, id: brand.id }
//       });
//     })
//   return brands 
// };

// export const initializeModelList = (data: ICar[]) => {
//   return Array.from(
//     new Set(
//       data.map((car, idx) => {
//         return car.model_name;
//       })
//     )
//   );
// }

// Handle filter function
export const filterSelectedBarndOptions = (array: ICar[], option: string) => {
  return array.filter((item) => item.model_make_id === option);
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