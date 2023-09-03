import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceCalls, setHeaders } from "../../../utils/ServiceCalls";
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
export const getEachUser = createAsyncThunk(
  "getEachUser",
  async (_, { rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const accessToken = sessionStorage.getItem("access_token");
      const userId = sessionStorage.getItem("userId");
      Object.assign(headers.headers, {
        Authorization: `Bearer ${accessToken}`,
      });
      const response = await ServiceCalls.get(
        `${BACKEND_ROUTES.GET_EACH_USER}/${userId}`,
        headers
      );
      console.log("data", response)
      return response?.data;
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
    builder.addCase(getEachUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEachUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = {
        ...action.payload,
      };
    });
    builder.addCase(getEachUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setIsLoggedIn } = loginSlice.actions;
export const loginStore = (state) => state.login;
export default loginSlice.reducer;
