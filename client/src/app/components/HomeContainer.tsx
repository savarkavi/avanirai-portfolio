"use client";

import { FETCH_FEATURED_PROJECTSResult } from "@/sanity/types";
import React, { useState } from "react";
import Hero from "./Hero";
import IntroLoading from "./IntroLoading";
import gsap from "gsap";

const HomeContainer = ({
  featuredProjects,
}: {
  featuredProjects: FETCH_FEATURED_PROJECTSResult;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleLoaded = () => {
    gsap.to(".loader-container", {
      opacity: 1,
      duration: 1,
      delay: 0.5,
      onComplete: () => {
        setIsLoading(false);
      },
    });

    gsap.to("[data-loader-title]", {
      yPercent: -120,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <div>
      {isLoading && <IntroLoading progress={progress} />}
      <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
        <Hero
          featuredProjects={featuredProjects}
          isLoaded={!isLoading}
          onProgress={setProgress}
          onLoaded={handleLoaded}
        />
      </div>
    </div>
  );
};

export default HomeContainer;
