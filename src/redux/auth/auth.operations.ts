import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AuthService } from "../../services";
import { ISigninProps } from "../../interfaces";

export class AuthOperations {
  static signin = createAsyncThunk(
    "auth/signin",
    async ({ email, password }: ISigninProps, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.signin({ email, password });
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
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
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
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
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );
}
