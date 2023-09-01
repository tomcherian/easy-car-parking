import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls } from "../../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../../utils/BackendRoutes";

export const postLogin = createAsyncThunk("postLogin", async (body) => {
  try {
    const response = await ServiceCalls.post(BACKEND_ROUTES.LOGIN, body);
    sessionStorage.setItem("access_token", response?.data?.token);
  } catch (error) {
    console.log("console ", error);
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isLoggedIn: false,
    isLoginError: false,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.isLoginError = false;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isLoginError = false;
    });
    builder.addCase(postLogin.rejected, (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isLoginError = true;
    });
  },
});

export const { setIsLoggedIn } = loginSlice.actions;
export const loginStore = (state) => state.login;
export default loginSlice.reducer;
