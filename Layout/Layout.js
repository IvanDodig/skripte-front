import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  // if (true && router.asPath !== "/auth/login") {
  //   router.push("/auth/login");
  // }

  return (
    <>
      <Navbar />
      <div id="page-content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
