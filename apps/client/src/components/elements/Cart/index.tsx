"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useGetCartQuery } from "@shelby/api";

import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCountProductQuantity, useTotaPrice, toRupiah } from "@/lib/utils";

import { CartItem } from "./CardItem";
import { useState } from "react";

export const Cart = () => {
  const { refetch, data: cart } = useGetCartQuery({});

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const totalPrice = useTotaPrice(cart?.data);
  const totalQuantity = useCountProductQuantity(cart?.data);

  const renderCart = () => {
    if (!cart?.data.length) {
      return (
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div aria-hidden="true" className="relative text-muted-foreground">
            <ShoppingBag size={48} />
          </div>
          <div className="text-xl font-semibold">Your cart is empty</div>
          <SheetTrigger asChild>
            <Link
              href="/home"
              className={buttonVariants({
                variant: "link",
                size: "sm",
                className: "text-sm text-muted-foreground",
              })}
            >
              Add items to your cart to checkout
            </Link>
          </SheetTrigger>
        </div>
      );
    }

    return cart.data.map((cartItem) => {
      return (
        <CartItem
          key={cartItem.id}
          data={cartItem}
          stock={cartItem.productVariant.inventory[0].quantity}
          isChecked={selectedItems.includes(cartItem.productVariantId)}
          onToggle={handleToggle}
        />
      );
    });
  };

  const handleToggle = (productVariantId: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productVariantId)) {
        return prevSelectedItems.filter((id) => id !== productVariantId);
      } else {
        return [...prevSelectedItems, productVariantId];
      }
    });
  };

  const handleCheckout = () => {
    // Perform checkout logic with midtrans
    console.log("Selected items:", selectedItems);
    refetch();
  };

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingBag
          aria-hidden="true"
          className="group-hover:text-accent"
          size={18}
        />
        <span className="ml-2 text-sm font-medium group-hover:text-accent">
          {totalQuantity}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-6 sm:max-w-lg">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Cart ({cart?.data.length})</SheetTitle>
        </SheetHeader>
        <div className="flex w-full flex-col">
          <ScrollArea>{renderCart()}</ScrollArea>
        </div>
        <div className="space-y-4">
          <Separator />
          <div className="space-y-1.5 text-sm">
            <div className="flex">
              <span className="flex-1">Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex font-bold">
              <span className="flex-1">Total</span>
              <span>{toRupiah(totalPrice)}</span>
            </div>
          </div>
        </div>
        <SheetFooter>
          <span
            onClick={handleCheckout}
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Continue to Checkout
          </span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
