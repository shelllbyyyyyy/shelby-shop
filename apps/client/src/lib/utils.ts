import { ProductVariant } from "@/types";
import { Cart } from "@shelby/api";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// to pixel for tailwind
export const sizeConst = () => {
  const arr: any = {};

  for (let i = 0; i <= 3000; i++) {
    arr[i] = `${i}px`;
  }
  return arr;
};

// format currency
export const toRupiah = (price: number | undefined) => {
  return "Rp. " + price?.toLocaleString("id-ID");
};

// for testing Skeleton
export const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

// format date
export const formatDate = (date: string) => new Date(date).toISOString();

// count product quantity on cart
export const useCountProductQuantity = (cart: Cart[] | undefined): number => {
  if (!cart) {
    return 0;
  }

  let totalQuantity = 0;

  for (const item of cart) {
    totalQuantity += item.quantity;
  }

  return totalQuantity;
};

// count total price on cart
export const useTotaPrice = (
  cart: Cart[] | undefined,
  discountPercentage?: number
): number => {
  if (!cart) {
    return 0;
  }

  let totalPrice = 0;

  if (discountPercentage) {
    for (const item of cart) {
      const productPrice = item.productVariant.price;
      const discountedPrice =
        productPrice - (productPrice * discountPercentage) / 100;
      totalPrice += discountedPrice * item.quantity;
    }
  } else {
    for (const item of cart) {
      totalPrice += item.productVariant.price * item.quantity;
    }
  }

  return totalPrice;
};

function calculateTotalPrice(
  cart: Cart[] | undefined,
  products: ProductVariant[] | undefined
): number {
  if (!cart || !products) {
    return 0;
  }
  let totalPrice = 0;

  for (const item of cart) {
    const product = products.find((prod) => prod.id === item.productVariant.id);
    if (product) {
      const price = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;
      totalPrice += price * item.quantity;
    }
  }

  return totalPrice;
}
