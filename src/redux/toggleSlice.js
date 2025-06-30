import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    searchBarToggle: false,
    loginToggle: false,
    isDiffRes: false,
    similarResDish: {
      isSimilarResDishes: false,
      city: "",
      resLocation: "",
      resId: "",
      itemId: "",
    },
  },
  reducers: {
    toggleSearchBar: (state) => {
      state.searchBarToggle = !state.searchBarToggle;
    },
    toggleLogin: (state) => {
      state.loginToggle = !state.loginToggle;
    },
    toggleDiffRes: (state) => {
      state.isDiffRes = !state.isDiffRes;
    },
    toggleIsSimilarResDishes: (state) => {
      state.similarResDish.isSimilarResDishes =
        !state.similarResDish.isSimilarResDishes;
    },
    setSimilarResDish: (state, action) => {
      state.similarResDish = action.payload;
    },
    resetSimilarResDish: (state, action) => {
      state.similarResDish = {
        isSimilarResDishes: false,
        city: "",
        resLocation: "",
        resId: "",
        itemId: "",
      };
    },
  },
});

export const {
  toggleSearchBar,
  toggleLogin,
  toggleDiffRes,
  toggleIsSimilarResDishes,
  setSimilarResDish,
  resetSimilarResDish,
} = toggleSlice.actions;
export default toggleSlice.reducer;
