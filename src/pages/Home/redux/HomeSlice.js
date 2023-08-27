import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "dashboard",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
