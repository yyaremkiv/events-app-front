import "@/styles/globals.scss";
import { Layout } from "@/components/Layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
