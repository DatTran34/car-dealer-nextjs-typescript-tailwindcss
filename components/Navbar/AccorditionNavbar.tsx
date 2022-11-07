import React, { ReactNode } from 'react'
import { Fragment, useState } from "react";
import { DevicePhoneMobile, MapPin } from '../Icon';
import { IBrand } from '../Types/model';


function Accordion({children,open} : {children: ReactNode[]; open: boolean;}) {
    return (
        <div className='py-2 px-4 bg-white first:rounded-t-lg last:rounded-b-lg border-b-2'>
            {children[0]}
            {
                open && <div>{children[1]}</div>
            }
        </div>
    )
}

function AccordionHeader({children, onClick}:{children: string; onClick: () => void;}) {
    return (
        <div className='cursor-pointer' onClick={onClick}>
            {children}
        </div>
    )
}

function AccordionBody({children} : {children: ReactNode}) {
    return (
        <div className='space-y-4 pt-4'>
            {children}
        </div>
    )
}

function AccorditionNavbar({brands} : {brands : IBrand[]}) {
    const [open, setOpen] = useState(0);
 
    const handleOpen = (value:number) => {
      setOpen(open === value ? 0 : value);
    };
   
    return (
      <div className=''>
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Car Brands
          </AccordionHeader>
          <AccordionBody>
              {
                brands.map((brand,idx)=>(
                  <div className='flex flex-row space-x-4 items-center cursor-pointer text-sm'>
                    <img
                      width={30}
                      src={`https://www.auto-data.net/img/logos/${brand.brandName}.png`} alt="" />
                    <div>{brand.brandName}</div>
                  </div>
                ))
              }
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            Contact Us
          </AccordionHeader>
          <AccordionBody>
            <div className='flex flex-row text-sm items-center'>
              <DevicePhoneMobile/>
              <div>Phone Number : 555-555-555</div>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            Location
          </AccordionHeader>
          <AccordionBody>
          <div className='flex flex-row text-sm'>
              <MapPin/>
              <div>999 Marshall Longview Texas 75604 </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    );
}

export default AccorditionNavbar