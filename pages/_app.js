import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Fonts } from "../public/Fonts";

const theme = extendTheme({
  fonts: {
    heading: "Merriweather Sans",
    body: "Merriweather Sans",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
