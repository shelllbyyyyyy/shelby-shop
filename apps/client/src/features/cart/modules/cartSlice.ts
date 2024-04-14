import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartProducts } from "./cart.types";

type CartState = {
  cartItems: ICartProducts[];
};

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsToCart: {
      reducer: (state: CartState, action: PayloadAction<ICartProducts>) => {
        const selectedProduct = state.cartItems.find(
          (product) => product.id === action.payload.id
        );
        if (selectedProduct) {
          selectedProduct.quantity += 1;
          return;
        }

        state.cartItems.push(action.payload);
      },
      prepare: (product: ICartProducts) => ({
        payload: product,
      }),
    },

    deleteCartItem: (state: CartState, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    addQuantityItemsCart: (
      state: CartState,
      action: PayloadAction<ICartProducts>
    ) => {
      const selectItem = action.payload;
      const indexProduct = state.cartItems.findIndex(
        (product) => product.id === selectItem.id
      );

      state.cartItems[indexProduct].quantity += 1;
      state.cartItems[indexProduct].totalPrice =
        state.cartItems[indexProduct].quantity * selectItem.product.price;
    },

    minusQuantityItemsCart: (
      state: CartState,
      action: PayloadAction<ICartProducts>
    ) => {
      const selectItem = action.payload;
      const indexProduct = state.cartItems.findIndex(
        (product) => product.id === selectItem.id
      );

      if (state.cartItems[indexProduct].quantity > 1) {
        state.cartItems[indexProduct].quantity -= 1;
        state.cartItems[indexProduct].totalPrice =
          state.cartItems[indexProduct].quantity * selectItem.product.price;
      } else {
        const updatedCart = state.cartItems.filter(
          (product) => product.id !== selectItem.id
        );
        state.cartItems = updatedCart;
      }
    },

    changeQuantityItemsCart: (
      state: CartState,
      action: PayloadAction<ICartProducts>
    ) => {
      const item = action.payload;

      if (item && item.quantity >= 1) {
        const indexProduct = state.cartItems.findIndex(
          (product) => product.id === item.product.id
        );

        if (indexProduct !== -1) {
          state.cartItems[indexProduct].quantity += item.quantity;
          state.cartItems[indexProduct].totalPrice =
            state.cartItems[indexProduct].quantity *
            state.cartItems[indexProduct].product.price;
        } else {
          state.cartItems.push({
            ...item,
            quantity: item.quantity,
            totalPrice: item.quantity * item.product.price,
          });
        }
      }
    },
  },
});

const { actions } = cartSlice;

export const {
  addItemsToCart,
  deleteCartItem,
  addQuantityItemsCart,
  changeQuantityItemsCart,
  clearCart,
  minusQuantityItemsCart,
} = actions;

export default cartSlice.reducer;
