"use client";

import React, { useEffect, useRef, useState } from "react";
import { oldNewsPaper } from "@/fonts/fonts";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";
import { FETCH_CATEGORY_PROJECTSResult } from "@/sanity/types";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(useGSAP, Observer);

const WorkList = ({ data }: { data: FETCH_CATEGORY_PROJECTSResult }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(activeIdx);
  const listRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  useGSAP(
    () => {
      const SCROLL_COOLDOWN = 300;
      const mm = gsap.matchMedia();

      mm.add("(max-width: 768px)", () => {
        setIsMobile(true);

        const observer = Observer.create({
          target: window,
          type: "wheel,touch",
          wheelSpeed: -1,
          tolerance: 100,
          preventDefault: true,
          onUp: () => {
            if (isScrolling.current) return;
            if (activeIdxRef.current >= data.length - 1) return;

            isScrolling.current = true;

            setActiveIdx((prev) => prev + 1);

            setTimeout(() => {
              isScrolling.current = false;
            }, SCROLL_COOLDOWN);
          },
          onDown: () => {
            if (isScrolling.current) return;
            if (activeIdxRef.current <= 0) return;

            isScrolling.current = true;

            setActiveIdx((prev) => prev - 1);

            setTimeout(() => {
              isScrolling.current = false;
            }, SCROLL_COOLDOWN);
          },
        });

        return () => {
          setIsMobile(false);
          observer.kill();
        };
      });

      mm.add("(min-width: 769px)", () => {
        setIsMobile(false);

        const observer = Observer.create({
          target: window,
          type: "wheel,touch",
          wheelSpeed: -1,
          onUp: () => {
            if (isScrolling.current) return;
            if (activeIdxRef.current >= data.length - 1) return;

            isScrolling.current = true;

            const newIndex = activeIdxRef.current + 1;
            setActiveIdx(newIndex);

            gsap.to(`.title-strip-${newIndex}`, {
              width: "100%",
              duration: 0.3,
            });
            gsap.to(`.title-container-${newIndex}`, {
              color: "white",
              duration: 0.3,
            });

            gsap.to(`.title-strip-${newIndex - 1}`, {
              width: 0,
              duration: 0.3,
            });
            gsap.to(`.title-container-${newIndex - 1}`, {
              color: "black",
              duration: 0.3,
            });

            setTimeout(() => {
              isScrolling.current = false;
            }, SCROLL_COOLDOWN);
          },
          onDown: () => {
            if (isScrolling.current) return;
            if (activeIdxRef.current <= 0) return;

            isScrolling.current = true;

            const newIndex = activeIdxRef.current - 1;
            setActiveIdx(newIndex);

            gsap.to(`.title-strip-${newIndex}`, {
              width: "100%",
              duration: 0.3,
            });
            gsap.to(`.title-container-${newIndex}`, {
              color: "white",
              duration: 0.3,
            });

            gsap.to(`.title-strip-${newIndex + 1}`, {
              width: 0,
              duration: 0.3,
            });
            gsap.to(`.title-container-${newIndex + 1}`, {
              color: "black",
              duration: 0.3,
            });

            setTimeout(() => {
              isScrolling.current = false;
            }, SCROLL_COOLDOWN);
          },
        });

        return () => {
          setIsMobile(false);
          observer.kill();
        };
      });
    },
    { scope: wrapperRef, dependencies: [data.length] },
  );

  useGSAP(() => {
    if (isMobile) {
      gsap.to(".mobile-slide", {
        yPercent: -100 * activeIdx,
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      const ITEM_HEIGHT = 28;
      const VISIBLE_ITEMS = data.length;
      if (!listRef.current) return;

      let yOffset = 0;
      if (activeIdx >= VISIBLE_ITEMS - 1) {
        yOffset = -(activeIdx - (VISIBLE_ITEMS - 1)) * ITEM_HEIGHT;
      }

      gsap.to(listRef.current, {
        y: yOffset,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }
  }, [activeIdx, isMobile, data.length]);

  return (
    <div ref={wrapperRef} className={`${oldNewsPaper.className} h-full w-full`}>
      {isMobile ? (
        <div className="relative h-full w-full overflow-hidden">
          {data.map((item, i) => {
            const mediaUrl = item.coverMedia?.asset?.url ?? "";
            return (
              <div
                key={item._id}
                className="mobile-slide flex h-full w-full flex-col items-center justify-center gap-6 p-4"
              >
                <Link href={`/works/${item._id}`}>
                  {item.coverMedia?._type === "image" ? (
                    <Image
                      src={mediaUrl}
                      alt={item.projectName || "avani rai photography"}
                      width={500}
                      height={700}
                      className="h-fit w-auto object-contain"
                      priority={i < 2}
                    />
                  ) : (
                    <video
                      src={mediaUrl}
                      className="h-full w-full object-contain"
                      autoPlay={i === activeIdx}
                      loop
                      muted
                      playsInline
                      key={mediaUrl + i}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col justify-center p-6">
          <div className="h-fit max-h-[560px] w-full overflow-hidden">
            <div ref={listRef} className="h-fit w-full">
              {data.map((item, i) => {
                const isFirst = i === 0;
                return (
                  <div
                    key={i}
                    className="flex w-full items-center justify-between"
                  >
                    <div
                      className={`title-container-${i} relative flex gap-4 overflow-hidden ${
                        isFirst ? "text-white" : "text-black"
                      }`}
                    >
                      <p className="z-10 px-1">{i + 1}</p>
                      <p className="z-10 h-[28px] px-1 text-lg">
                        {item.projectName}
                      </p>
                      <div
                        className={`title-strip-${i} absolute top-0 left-0 h-full bg-black ${
                          isFirst ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                    <div
                      className={`title-container-${i} relative flex items-center gap-4 ${
                        isFirst ? "text-white" : "text-black"
                      }`}
                    >
                      <p className="z-10 px-1">7 files</p>
                      <p className="z-10 px-1">- {item.date}</p>
                      <div
                        className={`title-strip-${i} absolute top-0 left-0 h-full bg-black ${
                          isFirst ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {data.map((item, i) => {
              const isActive = activeIdx === i;
              const mediaUrl = item.coverMedia?.asset?.url ?? "";
              return (
                <Link
                  href={`/works/${item._id}`}
                  key={item._id}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                >
                  {item.coverMedia?._type === "image" ? (
                    <Image
                      src={mediaUrl}
                      alt={item.projectName || "avani rai photography"}
                      width={500}
                      height={500}
                      className="h-[700px] w-auto object-contain"
                      priority={i < 3}
                    />
                  ) : (
                    <video
                      src={mediaUrl}
                      className="h-full w-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                      key={mediaUrl + i}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkList;
