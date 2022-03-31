import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
const { CONTRACT_ABI, CONTRACT_ADDY, DAI_ABI,  DAI_ADDY} = require("../config")

//redux
import {setProvider,setWeb3,setWeb3Loading,logIn,logOut,setHasWeb3True,setHasProviderTrue, setBalance} from "@actions/userActions";
import {setPreferUsername,setPreferUsernameFlag,setPreferAvatarStyle} from "@actions/settingsActions";
import {store} from "../store"

export const checkWeb3 =  async () => {
    const provider = await detectEthereumProvider();
    if(provider){
        const web3 = new Web3(provider);
        store.dispatch(setHasWeb3True());
        store.dispatch(setHasProviderTrue());
        store.dispatch(setWeb3Loading(false));
        return true;
        
    }else{
        store.dispatch(setWeb3Loading(false));
        console.error("Please install MetaMask")
        return false;
    }
    
}

export const connectMetaMask = async () =>{
    store.getState().user.hasProvider ?  requestMetaMask() : console.error("Cannot connect MetaMask, try reload browser!")
} 

export const addLiquidity = async (amount) => {
    console.log("Adding liquidity");
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDY);
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);

    let amt = BigInt(10 ** 18) * BigInt(amount)

    web3.eth.getAccounts()
            .then((value)=>{
            if(value.length != 0){
                let userAddress = value[0];
                
                token_contract.methods.transfer(CONTRACT_ADDY, amt).send({from: userAddress})
                    .on('transactionHash', function(hash){
                        contract.methods.addLiquidity(amount).call(function (error, result) {
                            if (!error) {
                                alert(result);
                            } else
                            alert(error);
                        });
                });


            

            }
        })



    // let first = BigInt(amount) * BigInt(10**18)
    // let value = amount.mul(web3.utils.toBN(10).pow(18));




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
                web3.eth.getBalance(userAddress)
                .then(balance=>{
                    let balanceInEther = web3.utils.fromWei(balance,'ether')
                    balanceInEther = Number(balanceInEther).toFixed(2)
                    store.dispatch(setBalance(balanceInEther))
                })
                .catch(error=>console.error(error))
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
    let web3 = store.getState().user.web3
    web3.eth.getAccounts()
    .then((accounts)=>{
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
            web3.eth.getBalance(userAddress)
            .then(balance=>{
                let balanceInEther = web3.utils.fromWei(balance,'ether')
                balanceInEther = Number(balanceInEther).toFixed(2)
                store.dispatch(setBalance(balanceInEther))
            })
            .catch(error=>console.error(error))
        }
    })
    .catch(error=>{
        console.error(error)
    })

}





