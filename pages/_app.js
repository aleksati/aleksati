import React from "react";
import LayoutApp from "../layouts/layoutApp";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <LayoutApp>
        <Component {...pageProps} />
      </LayoutApp>
    </ThemeProvider>
  );
};

export default App;
