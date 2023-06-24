import { createSlice } from "@reduxjs/toolkit";

export interface IThemeState {
  mode: "light" | "dark";
}

const initialState: IThemeState = { mode: "light" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setModeTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setModeTheme } = themeSlice.actions;
export default themeSlice.reducer;
