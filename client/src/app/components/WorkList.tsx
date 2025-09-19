"use client";

import React, { useRef } from "react";
import { oldNewsPaper } from "@/fonts/fonts";
import { workTitles } from "@/lib/constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ITEM_HEIGHT = 28;
const VISIBLE_ITEMS = 20;

const WorkList = ({ activeIdx }: { activeIdx: number }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const blackStripAnim = useRef(null);

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
      className={`${oldNewsPaper.className} flex h-screen w-full flex-col justify-center p-6`}
    >
      <div className="h-fit max-h-[560px] w-full overflow-hidden">
        <div ref={listRef} className="h-fit w-full">
          {workTitles.map((item, i) => (
            <div key={i} className="flex w-full items-center justify-between">
              <div
                className={`title-container-${i + 1} ${i + 1 === 1 ? "text-white" : "text-black"} relative flex gap-8 overflow-hidden`}
              >
                <p className={`z-10 px-1`}>{item.id}</p>
                <p className={`z-10 h-[28px] px-1 text-xl`}>{item.title}</p>
                <div
                  className={`title-strip-${i + 1} absolute top-0 left-0 h-full ${i + 1 === 1 ? "w-full" : "w-0"} bg-black`}
                />
              </div>
              <div
                className={`title-container-${i + 1} ${i + 1 === 1 ? "text-white" : "text-black"} relative flex items-center gap-8`}
              >
                <p className={`z-10 px-1`}>{item.totalMedia} files</p>
                <p className={`z-10 px-1`}>- {item.date}</p>
                <div
                  className={`title-strip-${i + 1} absolute top-0 left-0 h-full ${i + 1 === 1 ? "w-full" : "w-0"} bg-black`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkList;
