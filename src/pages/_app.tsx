import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { injectStore } from "../config/axios.api";
import { Layout } from "../components/Layout/Layout";
import "../styles/globals.scss";

import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "../config/theme";

injectStore(store);

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
