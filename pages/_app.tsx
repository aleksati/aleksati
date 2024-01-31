import LayoutApp from "../layouts/LayoutApp";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/table.scss";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <LayoutApp>
      <Component {...pageProps} />
    </LayoutApp>
  </ThemeProvider>
);

export default App;
