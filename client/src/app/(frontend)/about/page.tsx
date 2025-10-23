import { oldNewsPaper } from "@/fonts/fonts";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="relative h-screen w-screen">
        <Image src="/about.gif" alt="image" fill className="object-cover" />
      </div>
      <p
        className={`${oldNewsPaper.className} absolute top-1/2 left-1/2 -translate-1/2 text-white xl:text-3xl`}
      >
        Comming Soon
      </p>
    </div>
  );
};

export default Page;
