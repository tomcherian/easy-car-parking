import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls, setHeaders } from "../../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../../utils/BackendRoutes";

export const postLogin = createAsyncThunk("postLogin", async (body) => {
  try {
    const headers = setHeaders();
    const accessToken = localStorage.getItem("access_token");
    Object.assign(headers.headers, {
      Authorization: `Bearer ${accessToken}`,
    });
    const response = ServiceCalls.post(BACKEND_ROUTES.LOGIN, body);
    sessionStorage.setItem("access_token", response?.access_token);
  } catch (error) {
    console.log("console ", error);
  }
});

export const counterSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(postLogin.rejected, (state) => {
      state.isLoading = false;
    });
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
