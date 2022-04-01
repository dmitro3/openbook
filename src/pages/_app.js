import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "@utils/create-emotion-cache";
import { theme } from "@styles/theme";
import "@styles/globals.css";
import { Loader } from "@components/Dashboard/Loader";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import Script from "next/script"

// New redux dependencies
import { Provider } from "react-redux";
import {persistor,store} from "../store";
import { PersistGate } from 'redux-persist/integration/react'

// Setting odds, and store them into redux
import { getOdds } from "@utils/getOdds" 

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  
  useEffect(()=>{
    getOdds();
  },[])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Decentralized Sportsbook</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossOrigin="anonymous" 
        />
      </Head>
      <Script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
      crossorigin="anonymous"/>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
        <PersistGate loading={<Loader/>} persistor={persistor}>
        <NextNProgress color="#34b8ff" />
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
