import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls, setHeaders } from "../../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../../utils/BackendRoutes";

export const getUsersData = createAsyncThunk(
  "getUsersData",
  async (_, { rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const accessToken = sessionStorage.getItem("access_token");
      Object.assign(headers.headers, {
        Authorization: `Bearer ${accessToken}`,
      });
      const response = await ServiceCalls.get(
        BACKEND_ROUTES.GET_USERS,
        headers
      );
      return response?.data;
    } catch (error) {
      console.log("console ", error);
      return rejectWithValue();
    }
  }
);

export const bookedParkingCard = createAsyncThunk(
  "bookedParkingCard",
  async (_, { rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const accessToken = sessionStorage.getItem("access_token");
      Object.assign(headers.headers, {
        Authorization: `Bearer ${accessToken}`,
      });
      const response = await ServiceCalls.get(
        BACKEND_ROUTES.BOOKED_PARKING_CARD,
        headers
      );
      return response?.data;
    } catch (error) {
      console.log("console ", error);
      return rejectWithValue();
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    usersData: [],
    isLoading: false,
    bookedParkingCard: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersData = action.payload;
    });
    builder.addCase(getUsersData.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(bookedParkingCard.pending, (state) => {
      state.isBookedParkingCardLoading = true;
    });
    builder.addCase(bookedParkingCard.fulfilled, (state, action) => {
      state.isBookedParkingCardLoading = false;
      state.bookedParkingCard = action.payload;
    });
    builder.addCase(bookedParkingCard.rejected, (state) => {
      state.isBookedParkingCardLoading = false;
    });
  },
});

export const {} = dashboardSlice.actions;
export const dashboardStore = (state) => state.dashboard;
export default dashboardSlice.reducer;
