import React from "react";
import { ICar } from "../Types/model";
import Image from "next/image";
import { SearchIcon, Stack, TagIcon } from "../Icon";
import Link from "next/link";
import { colors, colors_name } from "../Types/data";
function ProductCard({ car }: { car: ICar }) {
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="bg-white hover:drop-shadow-lg drop-shadow-md rounded-sm m-2">
      <div className="relative bg-[#becae3] p-2 ">
        <img
          className="object-contain"
          src={`https://cdn.imagin.studio/getImage?&customer=copyright-imaginstudio&make=${
            car.model_make_id
          }&modelFamily=${car.model_name}&paintId=${
            colors[car.model_color]
          }&fileType=webp&angle=23&aspectRatio=1.6&zoomType=fullscreen&width=1600&v3=true&margins=0`}
          alt="car"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 bg-[#359bef] text-[#fff] px-5">
          ${numberWithCommas(Number(car.model_price.toFixed(0)))}
        </div>
        <div className="absolute -bottom-5 right-5 bg-[#fff] text-[#359bef] p-2 rounded-full hover:bg-[#359bef] hover:text-white">
          <Link
            href={{
              pathname: "/productPage",
              query: { id: car.id }, // the data
            }}
          >
            <Stack />
          </Link>
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-3 px-2 md:px-5 py-4 gap-x-5">
          <div>
            <div className="text-base">{car.model_make_id}</div>
            <div className="text-xs text-[#8c8c8c]">{car.model_name}</div>
          </div>
          <div className="grid col-span-2 grid-cols-2 text-[#8c8c8c] text-center">
            <div>
              <div className="text-xs">Year</div>
              <div className="text-sm">{car.model_year}</div>
            </div>
            <div>
              <div className="text-xs">Mileage</div>
              <div className="text-sm">{`${car.model_mileage} miles`}</div>
            </div>
            <div>
              <div className="text-xs">Year</div>
              <div className="text-sm">{car.model_year}</div>
            </div>
            <div>
              <div className="text-xs">Mileage</div>
              <div className="text-sm">{car.model_mileage}</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-light-green p-2 text-white cursor-pointer">
        <Link
          href={{
            pathname: "/productPage",
            query: { id: car.id }, // the data
          }}
        >
          <div>See Detail</div>
        </Link>
      </div> */}
    </div>
  );
}

export default ProductCard;
