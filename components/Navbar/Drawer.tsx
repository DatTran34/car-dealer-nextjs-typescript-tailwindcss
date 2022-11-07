import React from "react";
import { XCircleIcon } from "../Icon";

export default function Drawer({ children, isOpen, setIsOpen } : {children:React.ReactNode, isOpen : boolean, setIsOpen:React.Dispatch<React.SetStateAction<any>> }) {
  return (
    <main
      className={
        "md:hidden fixed overflow-hidden z-[13] bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-xs right-0 absolute bg-[#1d344c] h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-xs pb-10 flex flex-col space-y-2 overflow-y-scroll h-full">
          <header className="p-2 font-bold text-lg cursor-pointer" onClick={()=> {setIsOpen(!isOpen)}}>
            <XCircleIcon/>
          </header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
