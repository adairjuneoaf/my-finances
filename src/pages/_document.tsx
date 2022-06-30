import Document, { Html, Main, Head, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            href="logo.svg"
            type="image/svg"
            sizes="1024x1024"
          />
        </Head>
        <body>
          <ColorModeScript type={"localStorage"} initialColorMode={"light"} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
