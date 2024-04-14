import Link from "next/link";
import { ShoppingBag } from "lucide-react";

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

import { useActions } from "@/features/cart";
import { toRupiah } from "@/lib/utils";

import { CartItem } from "./CardItem";

export const Cart = () => {
  const { cartItem, totalItems, totalPrices } = useActions();

  const handleCheckoutToWhatsapp = () => {
    if (totalItems === 0) return;

    const phoneNumber = "6285156534829";
    const message = encodeURIComponent(
      `Halo, Saya ingin membeli :\n\n${cartItem
        .map((item) => `${item.quantity} pcs - ${item.product.name}`)
        .join(",\n")} \n\nTotal harga ${toRupiah(totalPrices)}`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
  };

  const fee = 1000;

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingBag
          aria-hidden="true"
          className="group-hover:text-accent"
          size={18}
        />
        <span className="ml-2 text-sm font-medium group-hover:text-accent">
          {totalItems}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        {totalItems > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {cartItem.map((item) => (
                  <CartItem
                    id={item.id}
                    key={item.id}
                    quantity={item.quantity}
                    totalPrice={item.totalPrice}
                    product={{
                      id: item.product.id,
                      name: item.product.name,
                      price: item.product.price,
                      imageUrl: item.product.imageUrl,
                    }}
                  />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{toRupiah(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{toRupiah(totalPrices + fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <span
                  onClick={handleCheckoutToWhatsapp}
                  className={buttonVariants({
                    className: "w-full",
                  })}
                >
                  Continue to Checkout
                </span>
              </SheetFooter>
            </div>
          </>
        ) : (
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
        )}
      </SheetContent>
    </Sheet>
  );
};
