"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/works/") ||
    pathname.startsWith("/editorial") ||
    pathname.startsWith("/films") ||
    pathname.startsWith("/advertisment") ||
    pathname.startsWith("/personal") ||
    pathname.startsWith("/studio/")
  )
    return null;
  return <Header />;
}
