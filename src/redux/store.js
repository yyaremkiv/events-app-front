import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./cities/event.slice";

export const store = configureStore({
  reducer: {
    events: eventSlice,
  },
});
