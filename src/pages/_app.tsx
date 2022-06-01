// Imports Next
import type { AppProps } from "next/app";

// Chakra UI Imports
import { ChakraProvider } from "@chakra-ui/react";

// Another Imports
import { theme } from "../styles/theme";
import { ContextDrawerProvider } from "../contexts/contextDrawer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextDrawerProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ContextDrawerProvider>
  );
}

export default MyApp;
