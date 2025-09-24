"use client";

import { gralice, oldNewsPaper } from "@/fonts/fonts";
import { urlFor } from "@/sanity/lib/image";
import { FeaturedProject, FETCH_FEATURED_PROJECTSResult } from "@/sanity/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, Observer);

const Hero = ({
  featuredProjects,
}: {
  featuredProjects: FETCH_FEATURED_PROJECTSResult;
}) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      if (!imageContainerRef.current) return;
      const images = gsap.utils.toArray<HTMLImageElement>(
        imageContainerRef.current.children,
      );

      const firstImage = images[0];
      if (!firstImage) return;

      const numImagesInSet = featuredProjects.length;
      const imageWidth = firstImage.offsetWidth;
      const gap = 16;
      const totalItemWidth = imageWidth + gap;
      const accurateLoopWidth = numImagesInSet * totalItemWidth;
      const centerPos = window.innerWidth / 2 - firstImage.offsetWidth / 2;
      const initialX = centerPos - accurateLoopWidth;

      let scrollObserver: Observer | null = null;
      let updateAnimation: (() => void) | null = null;

      gsap.set(images, { force3D: true });

      const tl = gsap.timeline({
        onComplete: () => {
          let currentX = initialX;
          let targetX = initialX;
          const speed = 1.2;
          const wrapX = gsap.utils.wrap(initialX - accurateLoopWidth, initialX);

          updateAnimation = () => {
            currentX += (targetX - currentX) * 0.08;
            let visualX = wrapX(currentX);
            gsap.set(imageContainerRef.current, { x: visualX });
          };

          gsap.ticker.add(updateAnimation);

          scrollObserver = Observer.create({
            target: window,
            type: "wheel,touch",
            wheelSpeed: -1,
            tolerance: 10,
            preventDefault: true,
            onWheel: (self) => {
              targetX += self.deltaY * speed;

              const rotationMultiplier = -0.25;
              const maxRotation = 15;

              const rotation = gsap.utils.clamp(
                -maxRotation,
                maxRotation,
                self.deltaY * rotationMultiplier,
              );

              gsap.to(images, {
                rotateX: rotation,
                duration: 1.5,
                ease: "power2.out",
                filter: "brightness(1.8)",
                overwrite: "auto",
              });
            },
            onMove: (self) => {
              targetX += self.deltaX * speed;

              const rotationMultiplier = -0.25;
              const maxRotation = 15;

              const rotation = gsap.utils.clamp(
                -maxRotation,
                maxRotation,
                self.deltaY * rotationMultiplier,
              );

              gsap.to(images, {
                rotateX: rotation,
                duration: 1.5,
                ease: "power2.out",
                filter: "brightness(1.8)",
                overwrite: "auto",
              });
            },
            onStop: () => {
              gsap.to(images, {
                rotateX: 0,
                duration: 1.5,
                filter: "brightness(1)",
                ease: "elastic.out(1, 0.5)",
              });

              const unwrappedClosestIndex = Math.round(
                (centerPos - targetX) / totalItemWidth,
              );

              const unwrappedSnapX =
                centerPos - unwrappedClosestIndex * totalItemWidth;

              targetX = unwrappedSnapX;

              const wrappedIndex =
                ((unwrappedClosestIndex % numImagesInSet) + numImagesInSet) %
                numImagesInSet;

              setActiveIdx(wrappedIndex);
            },
          });
        },
      });

      tl.fromTo(
        imageContainerRef.current,
        { x: centerPos, opacity: 0, scale: 0.5 },
        { x: initialX, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      );

      return () => {
        if (scrollObserver) {
          scrollObserver.kill();
        }
        if (updateAnimation) {
          gsap.ticker.remove(updateAnimation);
        }
      };
    },
    { scope: imageContainerRef },
  );

  return (
    <div className="hero-container relative flex h-[calc(100vh-64px)] flex-col justify-between overflow-hidden [perspective:1000px]">
      <h1
        className={`${gralice.className} absolute top-20 z-10 w-full text-center text-[20vw] leading-20 uppercase md:text-[16vw] xl:top-12 xl:left-6 xl:text-left xl:leading-50 2xl:top-24`}
      >
        Avani <span className="xl:hidden">Rai</span>
      </h1>
      <div
        className={`${oldNewsPaper.className} absolute top-[70%] z-20 flex w-full flex-col items-center gap-4 text-[0.7rem] xl:top-24 xl:right-6 xl:w-auto xl:text-[0.9rem] 2xl:text-base`}
      >
        <div
          className={`flex w-full justify-center gap-2 text-black uppercase`}
        >
          <div className="flex flex-col gap-2">
            <h2>In Focus:</h2>
            <p className="w-fit bg-black p-1 leading-none text-white">
              {featuredProjects[activeIdx].projectName}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p>22.05.25</p>
            <p className="w-fit leading-none">
              Featured in{" "}
              <span className="inline-block bg-black p-1 text-white">
                {featuredProjects[activeIdx].category}
              </span>
            </p>
          </div>
        </div>
        <p>
          See on{" "}
          <Link
            href={featuredProjects[activeIdx].instagramLink as Url}
            className="underline"
          >
            Instagram
          </Link>
        </p>
      </div>
      <div
        ref={imageContainerRef}
        className="absolute top-[45%] flex w-max -translate-y-1/2 items-center gap-4 opacity-0 [transform-style:preserve-3d] xl:top-1/2"
      >
        <>
          {featuredProjects.map((item, i) => {
            const imageUrl = item.coverImage
              ? urlFor(item.coverImage).url()
              : "";

            return (
              <Image
                key={`first-${i}`}
                src={imageUrl}
                alt="avani rai photography"
                width={300}
                height={300}
                className="h-[300px] w-[250px] shrink-0 object-cover"
                priority={i < 3}
              />
            );
          })}
        </>
        <>
          {featuredProjects.map((item, i) => {
            const imageUrl = item.coverImage
              ? urlFor(item.coverImage).url()
              : "";

            return (
              <Image
                key={`second-${i}`}
                src={imageUrl}
                alt="avani rai photography"
                width={300}
                height={300}
                className="h-[300px] w-[250px] shrink-0 object-cover"
              />
            );
          })}
        </>
        <>
          {featuredProjects.map((item, i) => {
            const imageUrl = item.coverImage
              ? urlFor(item.coverImage).url()
              : "";

            return (
              <Image
                key={`third-${i}`}
                src={imageUrl}
                alt="avani rai photography"
                width={300}
                height={300}
                className="h-[300px] w-[250px] shrink-0 object-cover"
              />
            );
          })}
        </>
      </div>
      <div className="plus-center fixed top-[45%] left-1/2 z-20 -translate-1/2 mix-blend-difference xl:top-1/2">
        <div className="absolute top-0 left-0 h-6 w-[1.5px] bg-white" />
        <div className="absolute top-0 left-0 h-6 w-[1.5px] rotate-90 bg-white" />
      </div>
      <div className="absolute bottom-6 left-1/2 w-full -translate-x-1/2 px-8 sm:w-fit sm:px-0 xl:left-6 xl:translate-0">
        <div
          className={`${oldNewsPaper.className} relative px-6 py-2 text-center text-[0.7rem] uppercase before:absolute before:top-0 before:left-0 before:h-4 before:w-4 before:border-t-2 before:border-l-2 before:content-[''] after:absolute after:right-0 after:bottom-0 after:h-4 after:w-4 after:border-r-2 after:border-b-2 after:content-[''] xl:text-left xl:text-base`}
        >
          <p>Mumbai based</p>
          <p>photographer & filmmaker</p>
        </div>
      </div>
      <h1
        className={`${gralice.className} absolute right-8 bottom-0 z-10 hidden text-[16vw] leading-20 uppercase xl:block xl:leading-50 2xl:leading-56`}
      >
        Rai
      </h1>
    </div>
  );
};

export default Hero;
