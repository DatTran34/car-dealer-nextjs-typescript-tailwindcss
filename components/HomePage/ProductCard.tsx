import React from "react";
import { ICar } from "../Types/model";
import Image from "next/image";
import { TagIcon } from "../Icon";
function ProductCard({ car }: { car: ICar }) {
  return (
    <div className="relative b flex flex-col z-30 space-y-2">
      <div className="bg-light-blue p-2 rounded-lg">
        <img
          className="object-contain"
          src="https://cdn.imagin.studio/getImage?&customer=copyright-imaginstudio&make=volvo&modelFamily=c40&paintId=pspc0014&fileType=webp&angle=23&aspectRatio=1.6&zoomType=fullscreen&width=1600&v3=true&margins=0"
          alt="as"
        />
      </div>
      <div className="text-xl">
        {car.car} {car.car_model}
      </div>
      <div className="text-sm text-gray-400">
        {car.car} {car.car_color} {car.car_model_year}
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <TagIcon />
        <p className="text-base text-light-green">{car.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
