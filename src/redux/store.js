import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./cities/city.slice";

export const store = configureStore({
  reducer: {
    city: citySlice,
  },
});
