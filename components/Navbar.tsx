import React from "react";
import { XCircleIcon, HomeIcon, SearchIcon, CartIcon } from "./Icon";

function Navbar() {
  return (
    <div className="w-full bg-white text-sm mx-auto py-4 flex flex-row items-center space-x-4 p-4">
      <HomeIcon />
      <div>DT Auto</div>
      <div className="flex-grow bg-blue-100 text-[#777C91] flex flex-row space-x-4 p-2 rounded">
        <SearchIcon/>
        <input
          type="text"
          placeholder="Search ..."
          className="flex-grow bg-transparent outline-none text-sm"
        />
        <XCircleIcon />
      </div>
      <CartIcon/>
      <div>Your Cart</div>
    </div>
  );
}

export default Navbar;
