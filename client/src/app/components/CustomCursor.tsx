"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pathname = usePathname();

  const isStudioRoute = pathname.startsWith("/studio");

  useEffect(() => {
    if (isStudioRoute) {
      document.body.style.cursor = "auto";
    } else {
      document.body.style.cursor = "none";
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  if (isStudioRoute) return null;

  return (
    <div
      className="pointer-events-none fixed z-[999] hidden h-3 w-3 rounded-full bg-white mix-blend-difference 2xl:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
