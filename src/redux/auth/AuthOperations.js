import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

class AuthActions {
  static signin = createAsyncThunk(
    "auth/signin",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.signin({ email, password });
        return data;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static signup = createAsyncThunk(
    "auth/signup",
    async ({ username, email, password }, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.signup({
          username,
          email,
          password,
        });
        return data;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.logout();
        return data;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );

  static refresh = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.refresh();
        return data;
      } catch (err) {
        return rejectWithValue(
          err?.response?.data?.message || "An error occurred with the network"
        );
      }
    }
  );
}

export default AuthActions;
