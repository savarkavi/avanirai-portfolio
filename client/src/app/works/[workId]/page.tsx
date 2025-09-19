"use client";

import { gralice } from "@/fonts/fonts";
import { heroImages } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Page = () => {
  useGSAP(() => {
    const containers = gsap.utils.toArray<HTMLDivElement[]>(
      ".work-image-container",
    );
    const images = gsap.utils.toArray<HTMLDivElement[]>(".work-image");

    images.forEach((item, i) => {
      if (i === 0) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            scrub: 1,
            pin: containers[i - 1],
            pinSpacing: false,
          },
        })
        .to(images[i - 1], { z: -200, rotateX: 45, y: "-20%", opacity: 0 });
    });
  });

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-black">
      <div className="fixed top-0 left-0 z-10 flex w-full items-center justify-between p-8 mix-blend-difference">
        <Link href="/" className="flex items-center gap-2 text-white">
          <IoIosArrowBack className="size-5" /> <span>Back Home</span>
        </Link>
        <h1
          className={`${gralice.className} pointer-events-none text-4xl text-white uppercase`}
        >
          Avani Rai
        </h1>
      </div>
      {heroImages.map((item, i) => (
        <div
          key={i}
          className="work-image-container"
          style={{ perspective: "1000px" }}
        >
          <div className="work-image h-screen w-full bg-white p-4 xl:p-8">
            <div key={i} className="relative h-full w-full bg-white">
              <Image
                src={item.src}
                alt="avani image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
