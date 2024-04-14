import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isLoggin: boolean;
};

const initialState: AuthState = {
  isLoggin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onAuthSuccess: (state, action) => {
      state.isLoggin = true;
    },

    onLogout: () => {
      return initialState;
    },
  },
});

const { actions } = authSlice;

export const { onAuthSuccess, onLogout } = actions;

export default authSlice.reducer;
