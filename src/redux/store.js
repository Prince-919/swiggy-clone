import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleSlice";
import cartReducer from "./cartSlice";
import filterReducer from "./filterSlice";
import authReducer from "./authSlioce";

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    cart: cartReducer,
    filter: filterReducer,
    auth: authReducer,
  },
});
export default store;
