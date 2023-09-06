import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    isLoading: false,
    showDrawer: false,
  },
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setShowDrawer: (state) => {
      state.showDrawer = !state.showDrawer;
    },
  },
});

export const { setIsLoading, setShowDrawer } = commonSlice.actions;
export const commonStore = (state) => state.common;
export default commonSlice.reducer;
