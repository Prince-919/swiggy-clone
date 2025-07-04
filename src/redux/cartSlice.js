import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
    resInfo: JSON.parse(localStorage.getItem("resInfo")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { info, resInfo } = action.payload;
      state.cartItems = [...state.cartItems, info];
      state.resInfo = resInfo;
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
      localStorage.setItem("resInfo", JSON.stringify(resInfo));
    },
    removeFromCart: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cartData", JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.resInfo = [];
      localStorage.removeItem("cartData");
      localStorage.removeItem("resInfo");
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
