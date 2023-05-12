import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";
import { Layout } from "@/components/Layout/Layout";
import "@/styles/globals.scss";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
