import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: JSON.parse(localStorage.getItem("userData")),
  },
  reducers: {
    signIn: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
});

export const { signIn, logOut } = authSlice.actions;
export default authSlice.reducer;
