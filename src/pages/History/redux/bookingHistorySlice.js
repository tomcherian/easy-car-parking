import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls, setHeaders } from "../../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../../utils/BackendRoutes";

export const getBookingHistory = createAsyncThunk(
  "getBookingHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const accessToken = sessionStorage.getItem("access_token");
      Object.assign(headers.headers, {
        Authorization: `Bearer ${accessToken}`,
      });
      const response = await ServiceCalls.get(
        BACKEND_ROUTES.GET_BOOKING_HISTORY,
        headers,
        { userId: userId }
      );
      return response?.data;
    } catch (error) {
      console.log("console ", error);
      return rejectWithValue();
    }
  }
);

export const bookingHistorySlice = createSlice({
  name: "bookingHistory",
  initialState: {
    isLoading: false,
    bookingCardHistory: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookingHistory.pending, (state) => {
      state.isLoading = true;
      state.bookingCardHistory = [];
    });
    builder.addCase(getBookingHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookingCardHistory = action.payload;
    });
    builder.addCase(getBookingHistory.rejected, (state) => {
      state.isLoading = false;
      state.bookingCardHistory = [];
    });
  },
});

export const {} = bookingHistorySlice.actions;
export const bookingHistoryStore = (state) => state.bookingHistory;
export default bookingHistorySlice.reducer;
