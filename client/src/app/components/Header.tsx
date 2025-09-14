import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div
      className={`header-container sticky top-0 flex h-16 w-full items-center justify-between px-6 py-4`}
    >
      <div className="relative h-8 w-8">
        <Image src="/avani-logo.svg" alt="logo" fill className="object-cover" />
      </div>
      <div className="flex items-start gap-8 font-serif text-sm uppercase">
        <div>
          <p>Menu</p>
        </div>
        <p>About</p>
        <p>Contact</p>
      </div>
    </div>
  );
};

export default Header;
