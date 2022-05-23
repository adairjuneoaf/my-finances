// Imports Next
import type { AppProps } from "next/app";

// Chakra UI Imports
import { ChakraProvider } from "@chakra-ui/react";

// Another Imports
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
