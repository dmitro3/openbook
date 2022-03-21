import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "@utils/create-emotion-cache";
import { theme } from "@styles/theme";
import "@styles/globals.css";
import { useEffect, useState } from "react";
import { Loader } from "@components/Dashboard/Loader";

// New redux dependencies
import { Provider } from "react-redux";
import {persistor,store} from "../store";
import { PersistGate } from 'redux-persist/integration/react'

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  const [documentLoaded, setDocumentLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener("load", (e) => setDocumentLoaded(true));
  });

  //console.log(store);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Decentralized Sportsbook</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
        <PersistGate loading={<Loader/>} persistor={persistor}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
          {/*documentLoaded ? getLayout(<Component {...pageProps} />):<Loader/>*/}
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
