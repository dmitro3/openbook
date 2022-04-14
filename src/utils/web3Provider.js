import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
const {LIQUIDITY_ABI, LIQUIDITY_ADDY, BET_ABI, BET_ADDY, DAI_ABI, DAI_ADDY} = require("../config")
const {MaxUint256} = require("@ethersproject/constants");

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

export const getPoolLiquidity = async () => {
    let dai_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);
    let res = await dai_contract.methods.balanceOf(LIQUIDITY_ADDY).call()
    console.log(res)
    return res;
}


export const getUserLiquidity = async () => {
    let web3 = store.getState().user.web3;
    let token_contract = new web3.eth.Contract(LIQUIDITY_ABI, LIQUIDITY_ADDY);
    let balance = 0;

    let account = await web3.eth.getAccounts()

    let res = await token_contract.methods.balanceOf(account[0], 0).call()

    console.log(res)
    return res;
}
        
export const addLiquidity = async (amount) => {
    console.log("Adding liquidity");
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(LIQUIDITY_ABI, LIQUIDITY_ADDY);
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);

    amount = parseInt(amount)
    let amt = BigInt(10 ** 18) * BigInt(amount)

    web3.eth.getAccounts()
            .then((value)=>{
            if(value.length != 0){
                let userAddress = value[0];
                
                (async () => {
                
                    let x = await token_contract.methods.allowance(userAddress, LIQUIDITY_ADDY).call()
                    
                    if (x < amt)
                    {
                        await token_contract.methods.approve(LIQUIDITY_ADDY, MaxUint256).send({from: userAddress})
                    }

                    let exactAmt = web3.utils.toWei(String(amount), 'ether')
                    await contract.methods.addLiquidity(exactAmt).send({from: userAddress})

                })();
            }
        })

}



export const makeBet = async (id, pick, amount) => {
    console.log("Making Bet");
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);

    amount = parseInt(amount)
    let amt = BigInt(10 ** 18) * BigInt(amount)

    web3.eth.getAccounts()
            .then((value)=>{
            if(value.length != 0){
                let userAddress = value[0];
                
                (async () => {
                
                    let x = await token_contract.methods.allowance(userAddress, BET_ADDY).call()
                    
                    if (x < amt)
                    {
                        await token_contract.methods.approve(BET_ADDY, MaxUint256).send({from: userAddress})
                    }

                    let exactAmt = web3.utils.toWei(String(amount), 'ether')
                    await contract.methods.createBet(id, pick, exactAmt).send({from: userAddress})

                })();
            }
        })

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
            let accounts = await web3.eth.getAccounts()
            if(accounts.length != 0){
                let userAddress = accounts[0];
                let preferUserName = `${userAddress.slice(0,5)}...${userAddress.slice(userAddress.length-4)}`;
                let preferUsernameFlag = store.getState().settings.preferUsernameFlag[userAddress];
                store.dispatch(logIn(userAddress));
                if(!preferUsernameFlag){
                    store.dispatch(setPreferUsername(userAddress,preferUserName));
                    store.dispatch(setPreferUsernameFlag(userAddress));
                    store.dispatch(setPreferAvatarStyle(userAddress,"robot"));
                }
                let dai_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);
                let balanceInWei = await dai_contract.methods.balanceOf(userAddress).call()
                let balanceInEther = web3.utils.fromWei(balanceInWei,'ether')
                balanceInEther = Number(balanceInEther).toFixed(2)
                store.dispatch(setBalance(balanceInEther))
            }   
    }catch{
        console.error("Can not retrieve account")
    }
}

export const disconnectMetaMask  = () => {
    store.dispatch(logOut());
}

export const switchAccount = async () => {
    let web3 = store.getState().user.web3
    let accounts = await web3.eth.getAccounts()
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
        let dai_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);
        let balanceInWei = await dai_contract.methods.balanceOf(userAddress).call()
        let balanceInEther = web3.utils.fromWei(balanceInWei,'ether')
        balanceInEther = Number(balanceInEther).toFixed(2)
        store.dispatch(setBalance(balanceInEther))
    }
}





