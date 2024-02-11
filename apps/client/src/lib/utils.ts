import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sizeConst = () => {
  const arr: any = {};

  for (let i = 0; i <= 3000; i++) {
    arr[i] = `${i}px`;
  }
  return arr;
};
