import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Provider, createClient } from "urql";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  const client = createClient({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
  });
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
