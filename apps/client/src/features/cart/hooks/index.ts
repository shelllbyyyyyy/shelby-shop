import { RootState, useAppSelector } from "@/lib/redux/store";

export const useActions = () => {
  const cartItem = useAppSelector(
    (state: RootState) => state.persistedReducer.cartSlice.cartItems
  );
  const totalItems = useAppSelector((state: RootState) =>
    state.persistedReducer.cartSlice.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );
  const totalPrices = useAppSelector((state: RootState) =>
    state.persistedReducer.cartSlice.cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    )
  );

  return { cartItem, totalItems, totalPrices };
};
