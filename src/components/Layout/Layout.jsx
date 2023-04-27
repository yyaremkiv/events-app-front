import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
