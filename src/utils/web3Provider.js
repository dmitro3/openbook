import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

//redux
import {setProvider,setWeb3,setWeb3Loading,logIn,logOut} from "@actions/userActions";
import {setPreferUsername,setPreferUsernameFlag} from "@actions/settingsActions";
import {store} from "../store"

export const checkWeb3 =  async () => {
    const provider = await detectEthereumProvider();
    if(provider){
        const web3 = new Web3(provider);
        store.dispatch(setProvider(provider));
        store.dispatch(setWeb3(web3));
        // store.dispatch(setProvider(true));
        // store.dispatch(setWeb3(true));
        store.dispatch(setWeb3Loading(false));
        
    }else{
        store.dispatch(setWeb3Loading(false));
        console.error("Please install MetaMask")
    }
    
}

export const connectMetaMask = () =>{
    store.getState().user.provider ?  requestMetaMask() : console.error("Cannot connect MetaMask, try reload browser!")
} 

const requestMetaMask = async () => {
    try{
            await store.getState().user.provider.request({method:"eth_requestAccounts"})
            store.getState().user.web3.eth.getAccounts()
            .then((value)=>{
            if(value.length != 0){
                let userAddress = value[0];
                let preferUserName = `${userAddress.slice(0,5)}...${userAddress.slice(userAddress.length-4)}`;
                let preferUsernameFlag = store.getState().settings.preferUsernameFlag;
                store.dispatch(logIn(userAddress));
                if(!preferUsernameFlag)
                    store.dispatch(setPreferUsername(preferUserName));
                    store.dispatch(setPreferUsernameFlag());
            }

            })
            .catch((error)=>{
                console.error(error);
            });
    }catch{
        console.error("Can not retrieve account")
    }
}

export const disconnectMetaMask = async () => {
    store.dispatch(logOut());
}






