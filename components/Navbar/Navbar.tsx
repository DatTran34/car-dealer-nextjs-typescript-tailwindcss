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
import logo from '../../DTMOTORS_logo.png'
import Image from "next/image";
import { motion } from "framer-motion"
function Navbar({ cars, brands }: { cars: ICar[], brands: IBrand[] }) {
  const { data: session } = useSession();

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);




  return (
    <div className=" bg-white">
      <div className="max-w-7xl text-sm mx-auto py-4 flex flex-row items-center justify-between space-x-2 md:space-x-6 p-4">
        <Link href="/" >
          <motion.div
            initial={{
              x: -500,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.5
            }}
            className="flex items-center space-x-2 cursor-pointer">
            <Image src={logo} alt="logo" width={70} height={70} />
            <div className="hidden md:block">DT Motors</div>
          </motion.div>
        </Link>
        <SearchBar cars={cars} />
        <div className="block md:hidden cursor-pointer" onClick={() => { setIsOpenDrawer(!isOpenDrawer) }}>
          <Bar3 />
        </div>
        <motion.div
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5
          }}
          className="hidden md:inline-flex flex flex-row items-center space-x-4">
          <div>Contact Us</div>
          <Menu>
            <MenuHandler>
              <div className="cursor-pointer">Car Brands</div>
            </MenuHandler>
            <MenuList>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
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
        </motion.div>
      </div>
      <Drawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer}>
        <div className="grid grid-cols-1 px-6 justify-center items-center space-y-4">
          {session ? (
            <Button variant="gradient">Hi {session.user?.name}</Button>
          ) : (
            <Button variant="gradient">Hi Customer</Button>
          )}
          <AccorditionNavbar brands={brands} />
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
