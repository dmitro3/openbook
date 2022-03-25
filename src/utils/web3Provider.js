import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

//redux
import {setProvider,setWeb3,setWeb3Loading,logIn,logOut} from "@actions/userActions";
import {setPreferUsername,setPreferUsernameFlag,setPreferAvatarStyle} from "@actions/settingsActions";
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
        return true;
        
    }else{
        store.dispatch(setWeb3Loading(false));
        console.error("Please install MetaMask")
        return false;
    }
    
}

export const connectMetaMask = async () =>{
    store.getState().user.provider ?  requestMetaMask() : console.error("Cannot connect MetaMask, try reload browser!")
} 

const requestMetaMask = async () => {
    try{
            const provider = await detectEthereumProvider();
            const web3 = {}
            if(provider){
                web3 = new Web3(provider);
                store.dispatch(setProvider(provider));
                store.dispatch(setWeb3(web3));
            }
            else{
                alert("MetaMask not detected")
                return
            }
            await provider.request({method:"eth_requestAccounts"})
            web3.eth.getAccounts()
            .then((value)=>{
            if(value.length != 0){
                let userAddress = value[0];
                let preferUserName = `${userAddress.slice(0,5)}...${userAddress.slice(userAddress.length-4)}`;
                let preferUsernameFlag = store.getState().settings.preferUsernameFlag[userAddress];
                store.dispatch(logIn(userAddress));
                if(!preferUsernameFlag){
                    store.dispatch(setPreferUsername(userAddress,preferUserName));
                    store.dispatch(setPreferUsernameFlag(userAddress));
                    store.dispatch(setPreferAvatarStyle(userAddress,"robot"));
                }
            }

            })
            .catch((error)=>{
                console.error(error);
            });
    }catch{
        console.error("Can not retrieve account")
    }
}

export const disconnectMetaMask  = () => {
    store.dispatch(logOut());
}

export const switchAccount = (accounts) => {
    store.getState().user.web3.eth.getAccounts().then((accounts)=>{
        if(accounts.length == 0){
            disconnectMetaMask();
            return
        }
        else{
            let userAddress = accounts[0]
            let preferUsernameFlag = store.getState().settings.preferUsernameFlag[userAddress];
            store.dispatch(logIn(userAddress));
            if(!preferUsernameFlag){
                let preferUserName = `${userAddress.slice(0,5)}...${userAddress.slice(userAddress.length-4)}`;
                store.dispatch(setPreferUsername(userAddress,preferUserName));
                store.dispatch(setPreferUsernameFlag(userAddress));
                store.dispatch(setPreferAvatarStyle(userAddress,"robot"));
            }
        }
    })

}






