import { Provider } from "react-redux";
import { store } from "../redux/store.js";
import { Layout } from "@/components/Layout/Layout";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
