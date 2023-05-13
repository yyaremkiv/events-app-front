import AuthService from "@/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

class AuthOperations {
  static login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.login({ email, password });
        return data;
      } catch (err) {
        return rejectWithValue(err.response);
      }
    }
  );
}

export default AuthOperations;
