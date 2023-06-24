import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthOperations } from "./auth.operations";

export interface IAuthState {
  user: any;
  isLogged: boolean;
  isLoading: boolean;
  accessToken: string | null;
  error: string | null;
  refreshAttempts: number;
}

const initialState: IAuthState = {
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
    builder.addCase(AuthOperations.signup.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthOperations.signup.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(
      AuthOperations.signup.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLogged = false;
        state.isLoading = false;
      }
    );
    builder.addCase(AuthOperations.signin.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthOperations.signin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(
      AuthOperations.signin.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLogged = false;
        state.isLoading = false;
      }
    );
    builder.addCase(AuthOperations.logout.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthOperations.logout.fulfilled, (state) => {
      state.accessToken = null;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(
      AuthOperations.logout.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.accessToken = null;
        state.isLogged = false;
        state.isLoading = false;
      }
    );
    builder.addCase(AuthOperations.refresh.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthOperations.refresh.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshAttempts = 0;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(
      AuthOperations.refresh.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.accessToken = null;
        state.isLogged = false;
        state.isLoading = false;
      }
    );
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
