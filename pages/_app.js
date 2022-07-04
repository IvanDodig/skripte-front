import Layout from "../Layout/Layout";
import "rsuite/dist/rsuite.min.css";
import "../styles/globals.css";
// Layout
import "../Layout/Layout.css";
import "../Layout/navbar/Navbar.css";
import "../Layout/footer/Footer.css";
// Pages
import "../styles/index.css";
//UI components
import "../components/UI/Input/Input.css";
import "../components/UI/Button/Button.css";
import AuthContextProvider from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
