import { createSlice } from "@reduxjs/toolkit";
import AuthActions from "./AuthOperations";

const initialState = {
  user: {},
  isLogged: false,
  isLoading: false,
  accessToken: null,
  error: null,
  refreshAttempts: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(AuthActions.signup.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthActions.signup.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(AuthActions.signup.rejected, (state, action) => {
      state.error = action.payload;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(AuthActions.signin.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthActions.signin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(AuthActions.signin.rejected, (state, action) => {
      state.error = action.payload;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(AuthActions.logout.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthActions.logout.fulfilled, (state) => {
      state.accessToken = null;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(AuthActions.logout.rejected, (state, action) => {
      state.error = action.payload;
      state.accessToken = null;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(AuthActions.refresh.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthActions.refresh.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshAttempts = 0;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(AuthActions.refresh.rejected, (state, action) => {
      state.error = action.payload;
      state.accessToken = null;
      state.isLogged = false;
      state.isLoading = false;
    });
  },
  reducers: {
    incrementRefreshAttempts: (state) => {
      state.refreshAttempts += 1;
    },
    resetRefreshAttempts: (state) => {
      state.refreshAttempts = 0;
    },
  },
});

export const { resetRefreshAttempts } = authSlice.actions;
export default authSlice.reducer;
