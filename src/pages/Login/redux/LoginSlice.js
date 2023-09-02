import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls } from "../../../utils/ServiceCalls";
import { BACKEND_ROUTES } from "../../../utils/BackendRoutes";

export const postLogin = createAsyncThunk(
  "postLogin",
  async (body, { rejectWithValue }) => {
    try {
      const response = await ServiceCalls.post(BACKEND_ROUTES.LOGIN, body);
      sessionStorage.setItem("access_token", response?.data?.token);
      sessionStorage.setItem("userId", response?.data?.user?.id);
      sessionStorage.setItem("userName", response?.data?.user?.name);
      sessionStorage.setItem("userEmail", response?.data?.user?.email);
      return response?.data?.user;
    } catch (error) {
      console.log("console ", error);
      return rejectWithValue();
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isLoggedIn: false,
    isLoginError: false,
    userData: {
      carNumber: "",
      contactNumber: undefined,
      createdDate: "",
      email: "",
      id: undefined,
      imageS3Link: "",
      name: "",
      password: "",
      updatedDate: "",
    },
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
      state.userData = {
        ...action.payload,
      };
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
