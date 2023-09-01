import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls } from "../../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../../utils/BackendRoutes";

export const postSignUp = createAsyncThunk("postSignup", async (body) => {
  try {
    const response = await ServiceCalls.post(BACKEND_ROUTES.SIGN_UP, body);
    sessionStorage.setItem("access_token", response?.data?.token);
  } catch (error) {
    console.log("console ", error);
  }
});

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    isLoading: false,
    isSignUpSuccess: false,
    isSignUpError: false,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isSignUpSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignUp.pending, (state) => {
      state.isLoading = true;
      state.isSignUpSuccess = false;
      state.isSignUpError = false;
    });
    builder.addCase(postSignUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSignUpSuccess = true;
      state.isSignUpError = false;
    });
    builder.addCase(postSignUp.rejected, (state) => {
      state.isLoading = false;
      state.isSignUpSuccess = false;
      state.isSignUpError = true;
    });
  },
});

export const { setIsLoggedIn } = signupSlice.actions;
export const signupStore = (state) => state.signup;
export default signupSlice.reducer;
