import { Fragment, useState } from "react";
import {
  Accordion ,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ICar } from "../Types/model";

function Icon({ id, open } : {id:number, open:number}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function AccordionProduct({ car }: { car: ICar }) {
  const [open, setOpen] = useState<number>(1);
 
  const handleOpen = (value:number) => {
    setOpen(open === value ? 0 : value);
  };
 
  const toCapitalize = (word: string) => {
    var array1 = word.split(" ");
    var newarray1 = [];

    for (var x = 0; x < array1.length; x++) {
      newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    }
    return newarray1.join(" ");
  };

  return (
    <div className="bg-[#ffffff] rounded-lg p-4">
      <Fragment>
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Overview
          </AccordionHeader>
          <AccordionBody className={"grid md:grid-cols-2 gap-4 h-min"}>
            {Object.keys(car).map((key, idx) => {
              return <div key = {idx} className="h-auto grid grid-cols-2">
                <div >{toCapitalize(key.replace(/_/g, " "))}</div>
                <div className="text-md text-black font-bold">{car[key]}</div>
              </div>;
            })}
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            Specification
          </AccordionHeader>
          <AccordionBody>
            We're not always in the position that we want to be at. We're
            constantly growing. We're constantly making mistakes. We're
            constantly trying to express ourselves and actualize our dreams.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            Review
          </AccordionHeader>
          <AccordionBody>
            We're not always in the position that we want to be at. We're
            constantly growing. We're constantly making mistakes. We're
            constantly trying to express ourselves and actualize our dreams.
          </AccordionBody>
        </Accordion>
      </Fragment>
    </div>
  );
}