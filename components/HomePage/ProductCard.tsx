import React from "react";
import { ICar } from "../Types/model";
import Image from "next/image";
import { SearchIcon, Stack, TagIcon } from "../Icon";
import Link from "next/link";
import { colors, colors_name } from "../Types/data";
function ProductCard({ car, color }: { car: ICar; color: string }) {
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className={`${(color=="black") ? "bg-[#f2e8de]" : "bg-[#232323]"} hover:drop-shadow-sm drop-shadow-sm rounded-sm `}>
      <div className={`relative ${(color=="black") ? "bg-[#d0ccc9]" : "bg-[#42362a]"} p-2 `}>
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
        <div className={`absolute bottom-0 left-0 ${(color=="black") ? "bg-[#dd981c]" : "bg-[#8c8c8c]"} text-[#fff] px-5`}>
          ${numberWithCommas(Number(car.model_price.toFixed(0)))}
        </div>
        <div className={`absolute -bottom-5 right-5 ${(color=="black") ? "bg-[#f2e8de]" : "bg-[#232323]"} text-[#dd981c] p-2 rounded-full hover:bg-[#dd981c] hover:text-white`}>
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
        <div className="flex flex-col px-2 md:px-5 py-4 gap-x-5 space-y-5">
          <div className="flex flex-col items-center justify-center">
            <div className={`text-sm ${(color=="black") ? "text-[#8c8c8c]" : "text-[#dd981c]"}`}>{car.model_make_id}</div>
            <div className={`text-base ${(color=="black") ? "text-[#232323]" : "text-[#f2e8de]"}`}>{car.model_name}</div>
          </div>
          <div className=" grid grid-cols-2 text-[#8c8c8c] text-center">
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
