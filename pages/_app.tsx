import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import resetStyles from "../styles/reset";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Global
        styles={css`
          ${resetStyles}
        `}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
