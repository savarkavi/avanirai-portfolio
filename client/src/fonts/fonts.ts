import { Eagle_Lake } from "next/font/google";
import localFont from "next/font/local";

export const eagleLake = Eagle_Lake({
  subsets: ["latin"],
  weight: ["400"],
});

export const gralice = localFont({
  src: "./gralice-roman.regular.ttf",
});

export const oldNewsPaper = localFont({
  src: "./OldNewspaperTypes.ttf",
});
