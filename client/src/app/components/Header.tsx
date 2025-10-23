"use client";

import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import MenuOverlay from "./MenuOverlay";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div
        className={`header-container fixed top-0 left-1/2 z-10 flex w-full -translate-x-1/2 ${pathname === "/" ? "justify-center" : "justify-end"} p-4 font-serif text-sm uppercase xl:justify-end`}
      >
        <div
          onClick={() => setIsOpen(true)}
          className="flex cursor-pointer items-center justify-between gap-6 rounded-full border border-gray-200 bg-white px-6 py-1 shadow-lg"
        >
          <IoMenu className="size-5 text-gray-500" />
          <p>Menu</p>
        </div>
      </div>
      <MenuOverlay isOpen={isOpen} onOpen={setIsOpen} />
    </>
  );
};

export default Header;
