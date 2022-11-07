import Link from "next/link";
import React, { useState } from "react";
import { XCircleIcon, HomeIcon, SearchIcon, CartIcon, Truck, Bar3 } from "../Icon";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import Drawer from "./Drawer";
import AccorditionNavbar from "./AccorditionNavbar";
import { IBrand, ICar } from "../Types/model";
import SearchBar from "./SearchBar";
function Navbar({ cars ,brands  }: { cars: ICar[], brands: IBrand[] }) {
  const { data: session } = useSession();

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);




  return (
    <div className=" bg-white">
      <div className="max-w-7xl text-sm mx-auto py-4 flex flex-row items-center justify-between space-x-2 md:space-x-6 p-4">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <Truck />
          <div className="hidden md:block">DT Auto</div>
        </Link>
        <SearchBar cars={cars}/>
        <div className="block md:hidden cursor-pointer" onClick={() => { setIsOpenDrawer(!isOpenDrawer) }}>
          <Bar3 />
        </div>
        <div className="hidden md:inline-flex flex flex-row items-center space-x-4">
          <div>Contact Us</div>
          <div>Cars</div>
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}>
            <MenuHandler>
              {session ? (
                <Button variant="gradient">Hi {session.user?.name}</Button>
              ) : (
                <Button variant="gradient">Hi Customer</Button>
              )}

            </MenuHandler>
            <MenuList>
              <MenuItem>Admin</MenuItem>
              <MenuItem>Favourite</MenuItem>
              <MenuItem>
                {session ? (
                  <div onClick={() => signOut()}>Sign Out</div>
                ) : (
                  <div onClick={() => signIn()}>Sign In</div>
                )}</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <Drawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer}>
        <div className="grid grid-cols-1 px-6 justify-center items-center space-y-4">
          {session ? (
            <Button variant="gradient">Hi {session.user?.name}</Button>
          ) : (
            <Button variant="gradient">Hi Customer</Button>
          )}
          <AccorditionNavbar brands={brands}/>
          {session ? (
            <Button className="cursor-pointer" onClick={() => signOut()}>Sign Out</Button>
          ) : (
            <Button className="cursor-pointer" onClick={() => signIn()}>Sign In</Button>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default Navbar;
