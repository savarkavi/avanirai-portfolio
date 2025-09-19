"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import WorkList from "../components/WorkList";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";
import { workTitles } from "@/lib/constants";

gsap.registerPlugin(useGSAP, Observer);

const Layout = ({ children }: { children: ReactNode }) => {
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
        if (activeIdxRef.current >= workTitles.length) return;

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
  }, []);

  return (
    <div className="flex">
      <WorkList activeIdx={activeIdx} />
    </div>
  );
};

export default Layout;
