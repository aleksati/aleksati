import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        {/* The Portal for my expandable images */}
        <div id="modal" />
        <NextScript />
      </body>
    </Html>
  );
}
