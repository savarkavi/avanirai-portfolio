"use client";

import React, { useEffect, useRef, useState } from "react";
import { oldNewsPaper } from "@/fonts/fonts";
import { workTitles } from "@/lib/constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";
import { FETCH_CATEGORY_PROJECTSResult } from "@/sanity/types";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(useGSAP, Observer);

const WorkList = ({ data }: { data: FETCH_CATEGORY_PROJECTSResult }) => {
  const ITEM_HEIGHT = 28;
  const VISIBLE_ITEMS = data.length;
  const listRef = useRef<HTMLDivElement>(null);
  const blackStripAnim = useRef(null);

  const [activeIdx, setActiveIdx] = useState(1);

  const activeIdxRef = useRef(activeIdx);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  useGSAP(() => {
    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      wheelSpeed: -1,
      onUp: () => {
        if (activeIdxRef.current >= data.length) return;

        setActiveIdx((prev) => prev + 1);
        activeIdxRef.current += 1;

        gsap
          .timeline({ defaults: { duration: 0.3 } })
          .to(`.title-strip-${activeIdxRef.current}`, { width: "100%" })
          .to(
            `.title-container-${activeIdxRef.current}`,
            { color: "white" },
            "<",
          );
        gsap
          .timeline()
          .to(`.title-strip-${activeIdxRef.current - 1}`, { width: 0 })
          .to(
            `.title-container-${activeIdxRef.current - 1}`,
            { color: "black" },
            "<",
          );

        console.log(activeIdxRef.current);
      },
      onDown: () => {
        if (activeIdxRef.current <= 1) return;

        activeIdxRef.current -= 1;
        setActiveIdx((prev) => prev - 1);

        gsap
          .timeline({ defaults: { duration: 0.3 } })
          .to(`.title-strip-${activeIdxRef.current}`, { width: "100%" })
          .to(
            `.title-container-${activeIdxRef.current}`,
            { color: "white" },
            "<",
          );
        gsap
          .timeline()
          .to(`.title-strip-${activeIdxRef.current + 1}`, { width: 0 })
          .to(
            `.title-container-${activeIdxRef.current + 1}`,
            { color: "black" },
            "<",
          );
      },
    });

    return () => {
      observer.kill();
    };
  }, [data.length]);

  useGSAP(() => {
    if (!listRef.current) return;

    let yOffset = 0;

    if (activeIdx >= VISIBLE_ITEMS) {
      const offsetItems = activeIdx - (VISIBLE_ITEMS - 1);
      yOffset = -offsetItems * ITEM_HEIGHT;
    }

    gsap.to(listRef.current, {
      y: yOffset,
      duration: 0.2,
      ease: "power2.inOut",
    });
  }, [activeIdx]);

  return (
    <div
      className={`${oldNewsPaper.className} flex h-full w-full flex-col justify-center p-6`}
    >
      <div className="h-fit max-h-[560px] w-full overflow-hidden">
        <div ref={listRef} className="h-fit w-full">
          {data.map((item, i) => {
            return (
              <div key={i} className="flex w-full items-center justify-between">
                <div
                  className={`title-container-${i + 1} ${i + 1 === 1 ? "text-white" : "text-black"} relative flex gap-4 overflow-hidden`}
                >
                  <p className={`z-10 px-1`}>{i + 1}</p>
                  <p className={`z-10 h-[28px] px-1 text-lg`}>
                    {item.projectName}
                  </p>
                  <div
                    className={`title-strip-${i + 1} absolute top-0 left-0 h-full ${i + 1 === 1 ? "w-full" : "w-0"} bg-black`}
                  />
                </div>
                <div
                  className={`title-container-${i + 1} ${i + 1 === 1 ? "text-white" : "text-black"} relative flex items-center gap-4`}
                >
                  <p className={`z-10 px-1`}>{7} files</p>
                  <p className={`z-10 px-1`}>- {item.date}</p>
                  <div
                    className={`title-strip-${i + 1} absolute top-0 left-0 h-full ${i + 1 === 1 ? "w-full" : "w-0"} bg-black`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="">
        {data.map((item, i) => {
          const isActive = activeIdx === i + 1;
          const mediaUrl = item.coverMedia?.asset?.url ?? "";

          return (
            <Link
              href={`/works/${item._id}`}
              key={item._id}
              className={`absolute top-1/2 left-1/2 w-fit -translate-1/2 transition-opacity duration-500 ${
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
  );
};

export default WorkList;
