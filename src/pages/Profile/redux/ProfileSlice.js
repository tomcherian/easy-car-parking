import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls } from "../../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../../utils/BackendRoutes";

export const updateUser = createAsyncThunk("updateUser", async (body) => {
  try {
    const response = await ServiceCalls.put(
      `${BACKEND_ROUTES.UPDATE_PROFILE}/${body.id}`,
      body,
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

export const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: {
    isLoading: false,
    data: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.isSignUpSuccess = false;
      state.isSignUpError = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default updateUserSlice.reducer;
