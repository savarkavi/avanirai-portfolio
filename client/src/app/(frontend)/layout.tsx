import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import HeaderWrapper from "../components/HeaderWrapper";
import { ReactLenis } from "lenis/react";
import { SanityLive } from "@/sanity/lib/live";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderWrapper />
      {children}
      <SanityLive />
    </>
  );
}
