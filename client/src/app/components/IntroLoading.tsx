"use client";

import { oldNewsPaper } from "@/fonts/fonts";
import { avaniProfilePhotos } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const IntroLoading = ({ progress }: { progress: number }) => {
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    avaniProfilePhotos.forEach((_, i) => {
      const current = `.profile-photo-${i}`;
      const next = `.profile-photo-${(i + 1) % avaniProfilePhotos.length}`;

      tl.to(current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      }).to(
        next,
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<",
      );
    });
  });

  return (
    <div className="loader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-black">
      <div className={`${oldNewsPaper.className} text-xl uppercase`}>
        <div className="absolute top-1/2 left-1/2 h-[180px] w-[180px] -translate-1/2">
          {avaniProfilePhotos.map((item, i) => (
            <div
              key={i}
              className={`profile-photo-${i} absolute h-full w-full rounded-sm ${i === 0 ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={item.src}
                alt="avani profile photo"
                fill
                className="rounded-sm object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-[65%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 xl:top-[62%]">
          <p>Avani Rai</p>
          <p>ਅਵਨੀ ਰਾਇ</p>
        </div>
      </div>
      <p className="absolute bottom-10 font-mono text-xl">
        {Math.floor(progress)}%
      </p>
    </div>
  );
};

export default IntroLoading;
