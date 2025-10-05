import { gralice, oldNewsPaper } from "@/fonts/fonts";
import Image from "next/image";
import React from "react";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  return (
    <div
      className={`header-container fixed top-0 left-1/2 z-10 flex w-full -translate-x-1/2 justify-center p-4 font-serif text-sm uppercase xl:justify-end`}
    >
      {/* <div className="relative h-8 w-8">
        <Image src="/avani-logo.svg" alt="logo" fill className="object-cover" />
      </div> */}

      {/* <div className="flex flex-col gap-1">
        <p>Archive+</p>
        <p>Films</p>
        <p>Editorial</p>
        <p>Advertising</p>
        <p>Personal</p>
      </div>
      <div className={`flex flex-col gap-1`}>
        <p>Instagram</p>
        <p>Email</p>
      </div>
      <p>About</p> */}
      <div className="flex cursor-pointer items-center justify-between gap-6 rounded-full border border-gray-200 bg-white px-6 py-1 shadow-lg">
        <IoMenu className="size-5 text-gray-500" />
        <p>Home</p>
      </div>
    </div>
  );
};

export default Header;
