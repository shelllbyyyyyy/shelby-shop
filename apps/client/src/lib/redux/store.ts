import { configureStore } from "@reduxjs/toolkit";

import authslice from "@/features/auth/modules/authSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { authslice },
});

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
