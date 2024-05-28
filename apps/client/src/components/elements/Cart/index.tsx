"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { AxiosError } from "axios";
import { CheckoutDTO } from "@shelby/dto";
import {
  useCheckoutMutation,
  useGetCartQuery,
  useSuccessMutation,
} from "@shelby/api";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCountProductQuantity, useTotaPrice, toRupiah } from "@/lib/utils";

import { CartItem } from "./CardItem";
import { queryClient } from "@/lib/react-query";

export const Cart = () => {
  const [token, setToken] = useState<string | undefined>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data: cart } = useGetCartQuery({});

  const totalPrice = useTotaPrice(cart?.data);
  const totalQuantity = useCountProductQuantity(cart?.data);

  const { mutateAsync: checkout, isPending } = useCheckoutMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCart"],
      });
      if (data.data.token) {
        setToken(data.data.token);
      } else {
      }
    },
  });

  const { mutateAsync: success } = useSuccessMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCart"],
      });
    },
  });

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

  const handleCheckout = async (values: CheckoutDTO) => {
    if (selectedItems.length == 0 || totalPrice == 0 || totalQuantity == 0) {
      return alert("Please select an item to checkout");
    } else {
      try {
        await checkout(values);
      } catch (error) {
        if (error instanceof AxiosError) {
          const err = error as AxiosError<{ errors: string[] }>;

          alert(err.response?.data.errors[0]);
          return;
        }
      }
    }
  };

  useEffect(() => {
    if (token) {
      if (typeof window.snap !== "undefined") {
        window.snap.pay(token, {
          onSuccess: async () => {
            await success({});
            setToken("");
          },
          onError: (data) => {
            // Payment failed
            console.error("Payment failed:", data);
          },
          onClose: () => {
            // Payment dialog closed
          },
        });
      } else {
        console.error("Midtrans SDK not loaded");
      }
    }
  }, [token]);

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
          <SheetClose asChild>
            <Button
              onClick={() =>
                handleCheckout({
                  items: selectedItems,
                })
              }
              className={buttonVariants({
                className: "w-full",
              })}
              disabled={isPending}
            >
              Continue to Checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
