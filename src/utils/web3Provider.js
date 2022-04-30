import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
const {LIQUIDITY_ABI, LIQUIDITY_ADDY, BET_ABI, BET_ADDY, MARKET_ABI, MARKET_ADDY, DAI_ABI, DAI_ADDY} = require("../config")
const {MaxUint256} = require("@ethersproject/constants");
var ethers_m = require('ethers');  

//redux
import {setProvider,setWeb3,setWeb3Loading,setEthers,logIn,logOut,setHasWeb3True,setHasProviderTrue, setBalance, setPoolLiquidity, setUserLiquidity, setbalanceHoldValue} from "@actions/userActions";
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
    let web3 = store.getState().user.web3;
    let dai_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);
    let res = await dai_contract.methods.balanceOf(LIQUIDITY_ADDY).call()
    let exactAmt = parseFloat(web3.utils.fromWei(String(res), 'ether')).toFixed(2);
    
    store.dispatch(setPoolLiquidity(exactAmt))

    return exactAmt;
}


export const getUserLiquidity = async () => {
    let web3 = store.getState().user.web3;
    let token_contract = new web3.eth.Contract(LIQUIDITY_ABI, LIQUIDITY_ADDY);
    let balance = 0;

    let account = await web3.eth.getAccounts()

    let res = await token_contract.methods.balanceOf(account[0], 0).call()
    let exactAmt =  parseFloat(web3.utils.fromWei(String(res), 'ether')).toFixed(2);

    store.dispatch(setUserLiquidity(exactAmt))

    return exactAmt;
}

export const getUserHold = async () =>{
    let web3 = store.getState().user.web3;
    let bet_contract = new web3.eth.Contract(BET_ABI, BET_ADDY);
    let balance = 0;

    let account = await web3.eth.getAccounts()

    let res = await bet_contract.methods.lockedLiquidity().call()
    let exactAmt =  parseFloat(web3.utils.fromWei(String(res), 'ether')).toFixed(2);

    return exactAmt;
}
        
export const addLiquidity = async (amount) => {
    console.log("Adding liquidity");
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(LIQUIDITY_ABI, LIQUIDITY_ADDY);
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);

    amount = parseInt(amount)
    let amt = BigInt(10 ** 18) * BigInt(amount)
    

    let account = await web3.eth.getAccounts()
    let userAddress = account[0];
    
    let x = await token_contract.methods.allowance(userAddress, LIQUIDITY_ADDY).call()
    
    if (x < amt)
    {
        await token_contract.methods.approve(LIQUIDITY_ADDY, MaxUint256).send({from: userAddress})
    }

    let exactAmt = web3.utils.toWei(String(amount), 'ether')
    await contract.methods.addLiquidity(exactAmt).send({from: userAddress})
}

export const removeLiquidity = async (amount) => {
    console.log("Removing liquidity");
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(LIQUIDITY_ABI, LIQUIDITY_ADDY);
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);

    amount = parseInt(amount)
    let amt = BigInt(10 ** 18) * BigInt(amount)
    

    let account = await web3.eth.getAccounts()
    let userAddress = account[0];

    let exactAmt = web3.utils.toWei(String(amount), 'ether')
    await contract.methods.removeLiquidity(exactAmt).send({from: userAddress})
}

export const getMyBets = async() => {
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);
    let match_contract = new web3.eth.Contract(MARKET_ABI, MARKET_ADDY);


    let account = await web3.eth.getAccounts()
    let userAddress = account[0];

    let bets = await contract.methods.getAllBets().call()
    let new_bets = []

    for (const bet of bets) {
        let bet_detail = await contract.methods.betDetailsByID(bet).call()
        
        if (bet_detail[1] == userAddress)
        {
            let match_details = await match_contract.methods.marketDetailsById(bet_detail[2]).call()
            
            

            let res = {}
            res['bet_time'] = bet_detail[0]
            res['game_time'] = match_details[0]
            res['league'] = match_details[2][1]
            res['game'] = match_details[1].join(' vs ')
            
            if (bet_detail[3] == '2')
                res['bet'] = "Draw"
            else
                res['bet'] = match_details[1][bet_detail[3]]

            res['stake'] = web3.utils.fromWei(String(bet_detail[4]), 'ether')
            res['return'] = web3.utils.fromWei(String(bet_detail[5]), 'ether')
            res['odds'] = parseFloat(res['return']/res['stake']).toFixed(2);
            res['result'] = bet[6]

            if (match_details[9] == true)
            {
                res['result'] = "😰"
            }
            else{
                if (match_details[3] == bet_detail[3])
                {
                    res['result'] = "😊"
                }
                else
                {
                    res['result'] = "😞"
                }
            }
            new_bets.push(res)
        }
    }

    
    return new_bets
}

export const claimBets = async () => {
    let web3 = store.getState().user.web3;

    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);
    let account = await web3.eth.getAccounts()
    console.log(account)
    let userAddress = account[0];

    let bets = await contract.methods.getAllBets().call()
    let claims = []
    let indexes = []
    let idx = 0
    for (const bet of bets) 
    {

        let bet_detail = await contract.methods.betDetailsByID(bet).call()

        if (bet_detail[1] == userAddress)
        {
            claims.push(bet)
        }

        indexes.push(idx)
        idx = idx + 1
    }

    console.log(claims)
    console.log(indexes)
    
    let res = await contract.methods.withdrawBets(claims, indexes).send({from: userAddress})
    
    if (res == true)
    {

    }
}

export const getMatches = async () => {

    // let web3  = store.getState().user.web3;
    // if (web3 == null)
    web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

    
    let contract = new web3.eth.Contract(MARKET_ABI, MARKET_ADDY);
    let account = await web3.eth.getAccounts()
    let userAddress = account[0];
    
    let matches = await contract.methods.getAllMarkets().call()
    let all_matches = []

    for (const match of matches) {
        let match_detail = await contract.methods.marketDetailsById(match).call()
        if (match_detail[9] == true)
            all_matches.push(match_detail)
    }

    console.log(all_matches)
    return [all_matches, matches]
}

export const makeBet = async (ids, picks, amounts) => {
    console.log("Making Bet");
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);
    
    let sum = 0
    let newAmts = []


    for (let i = 0; i < amounts.length; i++) 
    {
        sum = sum + amounts[i];
        newAmts.push(web3.utils.toWei(String(amounts[i]), 'ether'))
    }

    let exactAmt = web3.utils.toWei(String(sum), 'ether')

    let account = await web3.eth.getAccounts()
    let userAddress = account[0];

    let x = await token_contract.methods.allowance(userAddress, BET_ADDY).call()
    
    if (x < exactAmt)
    {
        await token_contract.methods.approve(BET_ADDY, MaxUint256).send({from: userAddress})
    }
    
    let new_picks = []
    
    for (var i=0; i < picks.length; i++)
    {
        if (picks[i] == '1')
            new_picks.push(0)
        else if (picks[i] == '2')
            new_picks.push(1)
        else
            new_picks.push(2)
    }


    await contract.methods.createBets(ids, new_picks, newAmts).send({from: userAddress})
    return true
}

export const getUserDaiBalance = async (web3,userAddress) =>{
    try{
        let dai_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);
        let balanceInWei = await dai_contract.methods.balanceOf(userAddress).call()
        let balanceInEther = web3.utils.fromWei(balanceInWei,'ether')
        balanceInEther = Number(balanceInEther).toFixed(2)
        store.dispatch(setBalance(balanceInEther))
    }
    catch(e){
        console.error("Can not get balance")
        console.error(e)
    }
}

const requestMetaMask = async () => {
    try{
            const provider = await detectEthereumProvider();
            const web3 = {}
            const ethers = {}

            if(provider){
                web3 = new Web3(provider);
                store.dispatch(setProvider(provider));
                store.dispatch(setWeb3(web3));

                ethers = new ethers_m.providers.Web3Provider(provider)
                store.dispatch(setEthers(ethers));

            }
            else{
                alert("MetaMask not detected")
                return
            }
            await ethers.send("eth_requestAccounts", []);

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
                getUserDaiBalance(web3,userAddress);
            }   
    }catch(e){
        console.error("Can not retrieve account")
        console.error(e)
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
        getUserDaiBalance(web3,userAddress);
    }
}

export const getBetLimit = async (ids) => {
    
    let id_only = []
    ids.map((text, index) => {
        id_only.push(text.split('/')[0]);
    })

    let web3 = store.getState().user.web3 || new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);
    let limit = await contract.methods.getLiquidityLimit(id_only).call()
    let exactLimit = parseFloat(web3.utils.fromWei(String(limit), 'ether')).toFixed(2);

    console.log(exactLimit)
    return exactLimit;
}