"use client";

import { gralice, oldNewsPaper } from "@/fonts/fonts";
import { FETCH_FEATURED_PROJECTSResult } from "@/sanity/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, Observer);

type HeroProps = {
  featuredProjects: FETCH_FEATURED_PROJECTSResult;
  isLoaded: boolean;
  onProgress: (progress: number) => void;
  onLoaded: () => void;
};

const Hero = ({
  featuredProjects,
  isLoaded,
  onProgress,
  onLoaded,
}: HeroProps) => {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  const projects = featuredProjects?.projects;
  if (!projects) return null;

  useEffect(() => {
    if (!heroContainerRef.current) return;

    const mediaElements = Array.from(
      heroContainerRef.current.querySelectorAll("img, video"),
    ) as (HTMLImageElement | HTMLVideoElement)[];

    const totalMedia = mediaElements.length;

    if (totalMedia === 0) {
      onProgress(100);
      onLoaded();
      return;
    }

    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const progress = (loadedCount / totalMedia) * 100;
      onProgress(progress);

      if (loadedCount === totalMedia) {
        setTimeout(onLoaded, 100);
      }
    };

    mediaElements.forEach((el) => {
      if (el.tagName === "IMG") {
        const img = el as HTMLImageElement;
        if (img.complete) {
          updateProgress();
        } else {
          img.onload = updateProgress;
          img.onerror = updateProgress;
        }
      } else if (el.tagName === "VIDEO") {
        const vid = el as HTMLVideoElement;
        if (vid.readyState >= 4) {
          updateProgress();
        } else {
          vid.oncanplaythrough = updateProgress;
          vid.onerror = updateProgress;
        }
      }
    });
  }, [onProgress, onLoaded]);

  useGSAP(
    () => {
      if (!isLoaded || !imageContainerRef.current) return;
      const images = gsap.utils.toArray<HTMLImageElement>(
        imageContainerRef.current.children,
      );

      const firstImage = images[0];
      if (!firstImage) return;

      const numImagesInSet = projects.length;
      const imageWidth = firstImage.offsetWidth;
      const gap = 16;
      const totalItemWidth = imageWidth + gap;
      const accurateLoopWidth = numImagesInSet * totalItemWidth;
      const centerPos = window.innerWidth / 2 - firstImage.offsetWidth / 2;
      const initialX = centerPos - accurateLoopWidth;

      let scrollObserver: Observer | null = null;
      let updateAnimation: (() => void) | null = null;

      gsap.set(images, { force3D: true, filter: "brightness(1)" });

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
            target:
              window.innerWidth >= 1280 ? window : imageContainerRef.current,
            type: "wheel,touch",
            wheelSpeed: -1,
            tolerance: 50,
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
            onDrag: (self) => {
              const maxDeltaPerEvent = 100;
              const touchMultiplier = 0.35;
              const raw = (self.deltaX ?? 0) * touchMultiplier * 1.0;
              const delta = gsap.utils.clamp(
                -maxDeltaPerEvent,
                maxDeltaPerEvent,
                raw,
              );
              targetX += delta;

              const rotationMultiplier = -0.25;
              const maxRotation = 15;

              const rotation = gsap.utils.clamp(
                -maxRotation,
                maxRotation,
                self.deltaX * rotationMultiplier,
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
      )
        .from(
          [".avani-title-text", ".avani-info-text"],
          { opacity: 0, x: -200 },
          "<",
        )
        .from(
          [".rai-title-text", ".project-info-text"],
          { opacity: 0, x: 200 },
          "<",
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
    { scope: heroContainerRef, dependencies: [isLoaded] },
  );

  return (
    <div
      ref={heroContainerRef}
      className="hero-container relative flex h-dvh flex-col justify-between overflow-hidden [perspective:1000px]"
    >
      <h1
        className={`${gralice.className} avani-title-text absolute top-[14%] z-10 w-full text-center text-[20vw] leading-20 uppercase md:text-[16vw] xl:top-12 xl:left-6 xl:text-left xl:leading-50 2xl:top-20`}
      >
        Avani <span className="xl:hidden">Rai</span>
      </h1>
      <div
        className={`${oldNewsPaper.className} project-info-text absolute top-[72%] z-20 flex w-full flex-col items-center gap-4 px-4 text-[0.7rem] xl:top-26 xl:right-6 xl:w-auto xl:p-0 xl:text-[0.9rem] 2xl:text-base`}
      >
        <div
          className={`flex w-full justify-center gap-2 text-black uppercase`}
        >
          <div className="flex flex-col gap-2">
            <h2>In Focus:</h2>
            <p className="w-fit bg-black p-1 leading-none text-white">
              {projects[activeIdx].projectName}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p>{projects[activeIdx].date}</p>
            <p className="flex w-fit items-center gap-2 leading-none">
              Featured in
              <span className="bg-black p-1 text-white">
                {projects[activeIdx].category}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        ref={imageContainerRef}
        className="absolute top-[47%] z-10 flex w-max -translate-y-1/2 items-center gap-4 opacity-0 brightness-100 [transform-style:preserve-3d] xl:top-1/2"
      >
        <>
          {projects.map((item, i) => {
            const mediaUrl = item.coverMedia?.asset?.url;
            if (item.coverMedia?._type === "image") {
              return (
                <Link href={`/works/${item._id}`} key={`first-${i}`}>
                  <Image
                    src={mediaUrl ? mediaUrl : ""}
                    alt="avani rai photography"
                    width={300}
                    height={300}
                    className="h-[300px] w-[250px] shrink-0 object-cover 2xl:h-[350px] 2xl:w-[300px]"
                    priority={i < 3}
                    loading="eager"
                  />
                </Link>
              );
            } else {
              return (
                <Link href={`/works/${item._id}`} key={`first-${i}`}>
                  <video
                    src={mediaUrl ? mediaUrl : ""}
                    className="h-[300px] w-[250px] shrink-0 object-cover 2xl:h-[350px] 2xl:w-[300px]"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                </Link>
              );
            }
          })}
        </>
        <>
          {projects.map((item, i) => {
            const mediaUrl = item.coverMedia?.asset?.url;

            if (item.coverMedia?._type === "image") {
              return (
                <Link href={`/works/${item._id}`} key={`second-${i}`}>
                  <Image
                    src={mediaUrl ? mediaUrl : ""}
                    alt="avani rai photography"
                    width={300}
                    height={300}
                    className="h-[300px] w-[250px] shrink-0 object-cover 2xl:h-[350px] 2xl:w-[300px]"
                    priority={i < 3}
                    loading="eager"
                  />
                </Link>
              );
            } else {
              return (
                <Link href={`/works/${item._id}`} key={`second-${i}`}>
                  <video
                    src={mediaUrl ? mediaUrl : ""}
                    className="h-[300px] w-[250px] shrink-0 object-cover 2xl:h-[350px] 2xl:w-[300px]"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                </Link>
              );
            }
          })}
        </>
        <>
          {projects.map((item, i) => {
            const mediaUrl = item.coverMedia?.asset?.url;

            if (item.coverMedia?._type === "image") {
              return (
                <Link href={`/works/${item._id}`} key={`third-${i}`}>
                  <Image
                    src={mediaUrl ? mediaUrl : ""}
                    alt="avani rai photography"
                    width={300}
                    height={300}
                    className="h-[300px] w-[250px] shrink-0 object-cover 2xl:h-[350px] 2xl:w-[300px]"
                    priority={i < 3}
                    loading="eager"
                  />
                </Link>
              );
            } else {
              return (
                <Link href={`/works/${item._id}`} key={`third-${i}`}>
                  <video
                    src={mediaUrl ? mediaUrl : ""}
                    className="h-[300px] w-[250px] shrink-0 object-cover 2xl:h-[350px] 2xl:w-[300px]"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                </Link>
              );
            }
          })}
        </>
      </div>
      <div
        className={`${oldNewsPaper.className} instagram-info absolute top-[82%] left-1/2 flex -translate-1/2 flex-col items-center gap-2 uppercase xl:top-[75%]`}
      >
        <p className="hidden xl:block">
          {activeIdx + 1} / {projects.length}
        </p>
        <p className="text-[0.7rem]">
          See on{" "}
          <Link
            href={projects[activeIdx].instagramLink as Url}
            className="underline"
          >
            Instagram
          </Link>
        </p>
      </div>
      <div className="plus-center fixed top-[45%] left-1/2 z-20 -translate-1/2 mix-blend-difference xl:top-1/2">
        <div className="absolute top-0 left-0 h-6 w-[1.5px] bg-white" />
        <div className="absolute top-0 left-0 h-6 w-[1.5px] rotate-90 bg-white" />
      </div>
      <div className="avani-info-text absolute bottom-6 left-1/2 w-full -translate-x-1/2 px-8 sm:w-fit sm:px-0 xl:left-6 xl:translate-0">
        <div
          className={`${oldNewsPaper.className} relative px-6 py-2 text-center text-[0.7rem] uppercase before:absolute before:top-0 before:left-0 before:h-4 before:w-4 before:border-t-2 before:border-l-2 before:content-[''] after:absolute after:right-0 after:bottom-0 after:h-4 after:w-4 after:border-r-2 after:border-b-2 after:content-[''] xl:text-left xl:text-base`}
        >
          <p>Mumbai based</p>
          <p>photographer & filmmaker</p>
        </div>
      </div>
      <h1
        className={`${gralice.className} rai-title-text absolute right-8 bottom-0 z-10 hidden text-[16vw] leading-20 uppercase xl:block xl:leading-50 2xl:leading-56`}
      >
        Rai
      </h1>
    </div>
  );
};

export default Hero;
