import { ImageIcon, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import {
  addQuantityItemsCart,
  minusQuantityItemsCart,
  deleteCartItem,
} from "@/features/cart";
import { ICartProducts } from "@/features/cart/modules/cart.types";

import { AppDispatch } from "@/lib/redux/store";
import { toRupiah } from "@/lib/utils";

export const CartItem: React.FC<ICartProducts> = ({
  id,
  quantity,
  totalPrice,
  product,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveItem = () => {
    dispatch(deleteCartItem(id));
  };

  const handleChangeItemCart = (operator: string) => {
    const cartProduct = {
      id: id,
      quantity: quantity,
      totalPrice: product.price * quantity,
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
      },
    };
    if (operator === "add") {
      dispatch(addQuantityItemsCart(cartProduct));
    } else {
      dispatch(minusQuantityItemsCart(cartProduct));
    }
  };

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof Image !== "string" && product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
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
              {product.name}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              Quantity:
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => handleRemoveItem()}
                className="flex items-center gap-0.5"
              >
                <X className="w-3 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium text-end">
          <span className="ml-auto line-clamp-1 text-sm">
            {toRupiah(product.price)}
          </span>
          <div className="flex gap-2 items-center">
            <span onClick={() => handleChangeItemCart("min")}>
              <Minus size={15} />
            </span>
            <span>x {quantity}</span>
            <span onClick={() => handleChangeItemCart("add")}>
              <Plus size={15} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
