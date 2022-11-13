import React from "react";
import type { AppProps } from "next/app";
// css imports here
import { ThemeProvider } from "theme-ui";
import theme from "../../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
