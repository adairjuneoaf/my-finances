import { Html, Main, Head, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />

        <link rel="shortcut icon" href="logo.svg" type="image/svg" sizes="1024x1024" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
