import { createSlice } from "@reduxjs/toolkit";
import AuthOperations from "./AuthOperations";
import themeSlice from "../theme/themeSlice";

const initialState = {
  admin: [],
  isLogged: false,
  isLoading: false,
  accessToken: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(AuthOperations.login.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthOperations.login.fulfilled, (state, action) => {
      state.isLogged = true;
      state.accessToken = action.payload.accessToken;
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.login.rejected, (state, action) => {
      state.isLogged = false;
      state.error = action.payload;
      state.isLoading = false;
    });
  },
  reducers: {
    logout: (state) => {
      state.isLogged = false;
      state.accessToken = null;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
