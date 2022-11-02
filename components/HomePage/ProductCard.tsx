import React from "react";
import { ICar } from "../Types/model";
import Image from "next/image";
import { TagIcon } from "../Icon";
import Link from "next/link";
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
        {car.model_make_display} {car.model_name}
      </div>
      <div className="text-sm text-gray-400">
        {car.model_make_display} {car.model_year}
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <TagIcon />
        <p className="text-base text-light-green">$20,555</p>
      </div>
      <div className="bg-light-green p-2 text-white cursor-pointer">
        <Link
          href={{
            pathname: "/productPage",
            query: { id: car.id }, // the data
          }}
        >
          <div>See Detail</div>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
