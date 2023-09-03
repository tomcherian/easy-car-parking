import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls } from "../../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../../utils/BackendRoutes";

export const getBookingAvailability = createAsyncThunk(
  "getBookingAvailability",
  async ({ startDateTime, endDateTime }) => {
    try {
      const response = await ServiceCalls.get(
        `${BACKEND_ROUTES.GET_BOOKING_AVAILABILITY}/${startDateTime}/${endDateTime}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("console ", error);
    }
  }
);

export const bookParking = createAsyncThunk("bookParking", async (data) => {
  try {
    const response = await ServiceCalls.post(
      `${BACKEND_ROUTES.BOOK_PARKING}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("console ", error);
  }
});

export const BookPopUpSlice = createSlice({
  name: "BookPopUpSlice",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    // resetBookingAvailability: (state) => {
    //   state.data = null;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookingAvailability.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBookingAvailability.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getBookingAvailability.rejected, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

// export const { resetBookingAvailability } = getBookingAvailabilitySlice.actions;
// export const loginStore = (state) => state.login;
export default BookPopUpSlice.reducer;