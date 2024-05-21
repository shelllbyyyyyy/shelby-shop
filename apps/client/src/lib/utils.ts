import { cache } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { axios } from "./axios";

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

export const toRupiah = (price: number | undefined) => {
  return "Rp. " + price?.toLocaleString("id-ID");
};

export const getItem = cache(async (slug: string) => {
  const item = await axios.get(`/product/${slug}`);

  const data = item.data;

  return data;
});

export const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const formatDate = (date: string) => new Date(date).toISOString();
