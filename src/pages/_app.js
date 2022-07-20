import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "@utils/create-emotion-cache";
import { theme } from "@styles/theme";
import "@styles/globals.css";
import { Loader } from "@components/General/Loader";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import {getMatches, getAllVaults, connectMetaMask, checkWeb3, switchAccount, disconnectMetaMask, getChainName} from "@utils/web3Provider";
import Web3 from 'web3';

// New redux dependencies
import { Provider } from "react-redux";
import {persistor,store} from "../redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { MARKETS_ABI, MARKETS_ADDY, WSS_PROVIDER} from "../config"
import {setOddsChanging,setNewOdds} from "redux/actions/oddsActions"
import {setVaults,setSelectedVaultAddress} from '@actions/vaultsAction'

// Setting odds, and store them into redux
import { getOdds } from "@utils/getOdds" 

import getAllWeb3s from "@utils/web3s";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    async function asyncUseEffectFunction() {

      /* 
      
      Here we initialize the APP, that includes getting vaults, getting odds, auto login users, 
      Kick start smart contract event listeners

      Function that get data from smart contracts use user web3 (MetaMask), hence we need to auto login user first.
      If users refuse to login via MetaMask or something is wrong with MetaMask, then we switch to local/socket web3. (127.0.0.1 or Infura).

      For future, we can handle the web3 providers better by separating them.
        // async function asyncGetWeb3s(){
        //   let web3s = await getAllWeb3s();
        //   console.log(web3s);
        // }
        // asyncGetWeb3s();

      */

      // First step auto login.
      let connectUserWeb3Success = false;
      try{
        let web3Existed = null;

        web3Existed = await checkWeb3();
        if(!web3Existed || store.getState().settings.disconnected || !window.ethereum.isConnected())
          return //for now I just returned, later we swtich the web3 provider here.
        
        connectUserWeb3Success = await connectMetaMask();
      }
      catch(error){
        console.error("AUTO LOGIN ERROR")
        console.error(error);
      }

      // After auto login, the user web3 is now stored in the redux user store.
      // Second step, getting vaults.
      let vaults = null;
      try{
        vaults = await getAllVaults();
        store.dispatch(setVaults(vaults))
      }
      catch(error){
        console.error("GETTING VAULTS ERRORS")
        console.error(error)
      }

      //Third step, getting odds and setting odds
      try{
        let data = null;
        if(vaults.length > 0){
          store.dispatch(setSelectedVaultAddress(vaults[0].ADDRESS))
          data = await getMatches(vaults[0]); 
          getOdds(data); 
        }
        else{
          console.warm("GET DATA WARNING")
          console.warm("NO VAULTS EXISTED")
        }
      }
      catch(error){
        console.error("GET DATA ERROR");
        console.error(error);
      }

      //Fourth step, kick start accounts changed listener
      try{
        if(window.ethereum){
          window.ethereum.on("accountsChanged", async function() {
            switchAccount();
          });
        }
      }
      catch(error){
        console.error("accountsChanged listener ERROR");
        console.error(error);
      }

      //Fifth step, kick start accounts disconnect listener
      try{
        if(window.ethereum){
          window.ethereum.on("disconnect", async function() {
            disconnectMetaMask();
          });
        }
      }
      catch(error){
        console.error("disconnectMetaMask listener ERROR");
        console.error(error);
      }

      //Sixth step, kick start chain changed listener
      try{
        if(window.ethereum){
          window.ethereum.on('chainChanged', async function() {
              getChainName();
          });
        }
      }
      catch(error){
        console.error("chainChanged listener ERROR");
        console.error(error);
      }     

    }

    //The previous 6 steps are in this function, they are all require await hence they are put in a async function.
    asyncUseEffectFunction();
    

    //This is last step, we kick start the event listener for the MARKET smart contract.
    let web3 = new Web3(new Web3.providers.WebsocketProvider(WSS_PROVIDER))
    let contract = new web3.eth.Contract(MARKETS_ABI, MARKETS_ADDY);

    contract.events.allEvents()
      .on('data', async (event) => {
        if (event['event'] == 'updateOdds_Event'){
          let data = await getMatches(props.vault);
          getOdds(data);
          let newOdds = event['returnValues'][1].map((item)=>{
            return Number(item)/1000
          })
          console.log(event['returnValues'][0]); //market id
          console.log(event['returnValues'][1]); //new odds
          store.dispatch(setOddsChanging(
            [
              event['returnValues'][0]
            ]
          ))
          store.dispatch(setNewOdds(
            newOdds
          ))
        }
      })
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
