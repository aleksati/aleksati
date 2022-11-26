import { ThemeProvider } from "next-themes";
import LayoutApp from "../layouts/layoutApp";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <LayoutApp>
        <Component {...pageProps} />
      </LayoutApp>
    </ThemeProvider>
  );
}

export default MyApp;
