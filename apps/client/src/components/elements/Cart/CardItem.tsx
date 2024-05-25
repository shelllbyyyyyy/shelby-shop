import { ImageIcon, Minus, Plus, X } from "lucide-react";
import {
  Cart,
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "@shelby/api";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDebounce } from "use-debounce";

import { toRupiah } from "@/lib/utils";
import { AxiosError } from "axios";
import { queryClient } from "@/lib/react-query";
import { Input } from "@/components/ui/input";

interface CartItemProps {
  data: Cart;
  stock: number;
  isChecked: boolean;
  onToggle: (values: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  data,
  stock,
  isChecked,
  onToggle,
}) => {
  const { productVariant } = data;

  const firstRenderRef = useRef<boolean>(true);

  const [currentQuantity, setCurrentQuantity] = useState<number>(data.quantity);
  const [quantityInputError, setQuantityInputError] = useState<string>("");
  const [debouncedQuantity] = useDebounce(currentQuantity, 1000);

  const { mutate: updateCartMutate } = useUpdateCartMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getCart"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        alert(err.response?.data.errors[0]);
        return;
      }
    },
  });

  const { mutate: deleteItem } = useDeleteCartMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getCart"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ errors: string[] }>;

        alert(err.response?.data.errors[0]);
        return;
      }
    },
  });

  const onUpdateCartQuantity = (type: "INCREMENT" | "DECREMENT") => {
    if (currentQuantity < stock && currentQuantity >= 0) {
      setCurrentQuantity((currentQuantity) =>
        type === "INCREMENT" ? currentQuantity + 1 : currentQuantity - 1
      );
    }
  };

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else if (debouncedQuantity) {
      updateCartMutate({
        productVariantId: productVariant.id,
        quantity: debouncedQuantity,
        cartId: data.id,
      });
      setQuantityInputError("");
    }
  }, [debouncedQuantity, data.id, updateCartMutate, productVariant.id]);

  useEffect(() => {
    if (data.quantity) {
      setCurrentQuantity(data.quantity);
    }
  }, [data.quantity]);

  return (
    <div className="relative space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <Input
          type="checkbox"
          checked={isChecked}
          className="absolute w-4 h-4 z-10"
          onChange={() => onToggle(data.productVariantId)}
        />
        <div className="flex items-center space-x-4 w-1/2">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof Image !== "string" && productVariant.imageUrl ? (
              <Image
                src={productVariant.imageUrl}
                alt={productVariant.label}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {productVariant.label}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              Quantity: {data.quantity}
            </span>
            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              Stocks: {stock}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => deleteItem({})}
                className="flex items-center gap-0.5"
              >
                <X className="w-3 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2 font-medium text-end">
          <span className="line-clamp-1 text-sm">
            {toRupiah(productVariant.price)}
          </span>

          <div className="flex gap-2 justify-end items-center">
            <button
              onClick={() => onUpdateCartQuantity("DECREMENT")}
              disabled={currentQuantity <= 1}
            >
              <Minus size={15} />
            </button>
            <span>{data.quantity}</span>
            <button onClick={() => onUpdateCartQuantity("INCREMENT")}>
              <Plus size={15} />
            </button>
          </div>
          {quantityInputError && (
            <h1 className="text-accent">{quantityInputError}</h1>
          )}
        </div>
      </div>
    </div>
  );
};
