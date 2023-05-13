import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth/authSlice";
import eventSlice from "./cities/event.slice";
import themeSlice from "./theme/themeSlice";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "isLogged", "admin"],
};

const persistThemeConfig = {
  key: "mode",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authSlice),
    theme: persistReducer(persistThemeConfig, themeSlice),
    events: eventSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
