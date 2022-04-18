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
import {getMatches} from "@utils/web3Provider";

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
  

  async function fetchData() {
      let odds = {}
      let [matches, ids] = await getMatches()
      let i = 0;
      // console.log(matches,ids)
      for (const match of matches)
      {
        if (!(match[2][0] in odds))
          odds[match[2][0]] = {}

        if (!(match[2][1] in odds[match[2][0]]))
          odds[match[2][0]][match[2][1]] = []

          let game = {
            timestamp : new Date(match[0]* 1000),
            id: ids[i],
            match: match[1]
          }

          //7 and 8
          let outcome = {}

          for (var j =0; j< match.length; j++)
          {

            if (match[7][j] != null)
              outcome[match[7][j]] = parseInt(match[8][j])/1000
          }

          game =
          {
            ...game,
            outcome: outcome
          } 

          odds[match[2][0]][match[2][1]].push(game)
          i = i + 1
      }
      // console.log(odds)
      return odds;
  }


  useEffect(() => {
    async function asyncUseEffectFunction() {
      let data = await fetchData();
      getOdds(data);
    }
    asyncUseEffectFunction();
  }, []);

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
        <NextNProgress color="#34b8ff" />
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
