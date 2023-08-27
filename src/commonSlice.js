import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { isLoading } = commonSlice.actions;
export const commonStore = (state) => state.common.value;
export default commonSlice.reducer;
