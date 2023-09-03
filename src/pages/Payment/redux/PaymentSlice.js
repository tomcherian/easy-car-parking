import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls, setHeaders } from "../../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../../utils/BackendRoutes";

export const getPaymentList = createAsyncThunk(
  "getPaymentList",
  async (_, { rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const accessToken = sessionStorage.getItem("access_token");
      Object.assign(headers.headers, {
        Authorization: `Bearer ${accessToken}`,
      });
      const response = await ServiceCalls.get(
        BACKEND_ROUTES.GET_PAYMENT,
        headers
      );
      return response?.data;
    } catch (error) {
      console.log("console ", error);
      return rejectWithValue();
    }
  }
);

export const postPayment = createAsyncThunk(
  "postPayment",
  async (body, { dispatch, rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const accessToken = sessionStorage.getItem("access_token");
      Object.assign(headers.headers, {
        Authorization: `Bearer ${accessToken}`,
      });
      await ServiceCalls.post(BACKEND_ROUTES.ADD_PAYMENT, body, headers);
      dispatch(getPaymentList());
    } catch (error) {
      console.log("console ", error);
      return rejectWithValue();
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    isLoading: false,
    isPaymentAddedSuccess: false,
    paymentListData: [],
  },
  reducers: {
    // setIsLoggedIn: (state, action) => {
    //   state.isLoggedIn = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(postPayment.pending, (state) => {
      state.isLoading = true;
      state.isPaymentAddedSuccess = false;
    });
    builder.addCase(postPayment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isPaymentAddedSuccess = true;
    });
    builder.addCase(postPayment.rejected, (state) => {
      state.isPaymentAddedSuccess = false;
      state.isLoading = false;
    });
    builder.addCase(getPaymentList.pending, (state) => {
      state.isLoading = true;
      state.paymentListData = [];
    });
    builder.addCase(getPaymentList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.paymentListData = action.payload;
    });
    builder.addCase(getPaymentList.rejected, (state) => {
      state.isLoading = false;
      state.paymentListData = [];
    });
  },
});

export const {} = paymentSlice.actions;
export const paymentStore = (state) => state.payment;
export default paymentSlice.reducer;