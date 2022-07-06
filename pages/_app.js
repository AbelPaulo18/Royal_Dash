import { AuthContext, AuthProvider } from "../context/Auth";
import "../styles/globals.css";
import { parseCookies } from "nookies";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
