// Chakra UI Imports
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
  colors: {
    green: {
      "50": "#F0FFF4",
      "100": "#C6F6D5",
      "200": "#9AE6B4",
      "300": "#68D391",
      "400": "#48BB78",
      "500": "#38A169",
      "600": "#2F855A",
      "700": "#276749",
      "800": "#22543D",
      "900": "#1C4532",
    },
    gray: {
      "50": "#EEEEF2",
      "100": "#D1D2DC",
      "200": "#B3B5C6",
      "300": "#9699B0",
      "400": "#797D9A",
      "500": "#616480",
      "600": "#4B4D63",
      "700": "#353646",
      "800": "#1F2029",
      "900": "#181B23",
    },
  },
  fonts: {
    body: `'Roboto', sans-serif`,
    heading: `'Roboto', sans-serif`,
  },
  styles: {
    global: {
      body: {
        backgroundColor: "gray.900",
        overflowX: "hidden",
        color: "gray.50",
      },
      "*::-webkit-scrollbar": {
        width: "8px",
      },
      "*::-webkit-scrollbar-thumb": {
        background: "gray.700",
      },
      "*::-webkit-scrollbar-track": {
        background: "gray.800",
      },
    },
  },
});
