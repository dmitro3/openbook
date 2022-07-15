import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
const {DAI_ABI, DAI_ADDY, HTTP_PROVIDER, WSS_PROVIDER, VAULT_ABI, BET_ABI, BET_ADDY, MARKETS_ABI, MARKETS_ADDY, VAULTMANAGER_ABI, VAULTMANAGER_ADDY} = require("../config")
const {MaxUint256} = require("@ethersproject/constants");
var ethers_m = require('ethers');  

//redux
import {setProvider,setWeb3,setWeb3Loading,setEthers,logIn,logOut,setHasWeb3True,setHasProviderTrue, setBalance, setPoolLiquidity, setUserLiquidity, setCurrentNetwork} from "redux/actions/userActions";
import {setPreferUsername,setPreferUsernameFlag,setPreferAvatarStyle} from "redux/actions/settingsActions";
import {setLiqDisplayValue,setbalanceHoldValue,setWithdrawableValue,setUserStakeValue} from "redux/actions/bookieActions";
import {setSettledBets,setUnsettledBets} from "redux/actions/accountActions";
import {store} from "../redux/store"

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
    
    let liquidity_contract = new web3.eth.Contract(LIQUIDITY_ABI, LIQUIDITY_ADDY);
    let res2 = await liquidity_contract.methods.getTotalSupply().call()
    let exactAmt2 = parseFloat(web3.utils.fromWei(String(res2), 'ether')).toFixed(2);


    return [exactAmt2, exactAmt];
}


export const getUserLiquidity = async () => {
    let web3 = store.getState().user.web3;
    let token_contract = new web3.eth.Contract(LIQUIDITY_ABI, LIQUIDITY_ADDY);
    let balance = 0;

    let account = await web3.eth.getAccounts()

    let res = await token_contract.methods.balanceOf(account[0], 0).call()

    let liquidity_contract = new web3.eth.Contract(LIQUIDITY_ABI, LIQUIDITY_ADDY);

    let exactDAI = await liquidity_contract.methods.getShareValue(res).call()
    
    let exactAmt =  parseFloat(web3.utils.fromWei(String(res), 'ether')).toFixed(2);
    exactDAI =  parseFloat(web3.utils.fromWei(String(exactDAI), 'ether')).toFixed(2);

    return [exactAmt, exactDAI];
}

export const getUserHold = async () =>{
    let web3 = store.getState().user.web3;
    let liquidity_contract = new web3.eth.Contract(LIQUIDITY_ABI, LIQUIDITY_ADDY);
    let balance = 0;

    let account = await web3.eth.getAccounts()

    let details = await liquidity_contract.methods.getUserLockedShares(account[0]).call()
    let exactAmt =  parseFloat(web3.utils.fromWei(String(details), 'ether')).toFixed(2);


    let locked = await liquidity_contract.methods.getLockedShares().call()

    let lockedDAI = await liquidity_contract.methods.getShareValue(locked).call()

    locked =  parseFloat(web3.utils.fromWei(String(locked), 'ether')).toFixed(2);
    lockedDAI =  parseFloat(web3.utils.fromWei(String(lockedDAI), 'ether')).toFixed(2);

    // let hodl = await liquidity_contract.methods.getDAIBalance().call()
    // let supply = await liquidity_contract.methods.getTotalSupply().call()
    

    return [locked, lockedDAI];
}
        
export const addLiquidity = async (vault, amount) => {
    console.log(amount, vault)
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(VAULT_ABI, vault.ADDRESS);
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);

    amount = parseInt(amount)
    let amt = BigInt(10 ** 18) * BigInt(amount)
    

    let account = await web3.eth.getAccounts()
    let userAddress = account[0];
    
    let x = await token_contract.methods.allowance(userAddress, vault.ADDRESS).call()
    
    if (x < amt)
    {
        await token_contract.methods.approve(vault.ADDRESS, MaxUint256).send({from: userAddress})
    }

    let exactAmt = web3.utils.toWei(String(amount), 'ether')
    await contract.methods.addLiquidity(exactAmt).send({from: userAddress})
}

export const removeLiquidity = async (amount) => {
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

async function process_bets(bets){
    let web3 = store.getState().user.web3;
    let match_contract = new web3.eth.Contract(MARKETS_ABI, MARKETS_ADDY);
    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);
    let account = await web3.eth.getAccounts()
    let userAddress = account[0];

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

export const getMyBets = async() => {
    if(!store.getState().user.web3 || !store.getState().user.web3.eth)
        return

    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);

    try{
    let bets = await contract.methods.getAllBets().call()
    let new_bets = await process_bets(bets)
    store.dispatch(setUnsettledBets(new_bets))
    }
    catch {
        
    }
}

export const getSettledBets = async() => {
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);


    let account = await web3.eth.getAccounts()
    let userAddress = account[0];

    let bets = await contract.methods.getSettledBets().call()
    let new_bets = await process_bets(bets)
    store.dispatch(setSettledBets(new_bets))
}

export const claimBets = async () => {
    let web3 = store.getState().user.web3;

    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);
    let account = await web3.eth.getAccounts()
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
    
    let res = await contract.methods.withdrawBets(claims, indexes).send({from: userAddress})
    
    if (res == true)
    {

    }
}

export const getMatches = async () => {

    // let web3  = store.getState().user.web3;
    // if (web3 == null)
    web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));

    let contract = new web3.eth.Contract(MARKETS_ABI, MARKETS_ADDY);
    let account = await web3.eth.getAccounts()
    let userAddress = account[0];
    
    let matches = await contract.methods.getAllMarkets().call()
    let all_matches = []

    for (const match of matches) {
        let match_detail = await contract.methods.marketDetailsById(match).call()
        if (match_detail[8] == true)
            all_matches.push(match_detail)
    }

    let odds = {}
    let i = 0;
    for (const match of all_matches)
    {
      if (!(match[2][0] in odds))
        odds[match[2][0]] = {}

      if (!(match[2][1] in odds[match[2][0]]))
        odds[match[2][0]][match[2][1]] = []

        let game = {
          timestamp : new Date(match[0]* 1000),
          id: matches[i],
          match: match[1]
        }

        //6 and 7
        let outcome = {}

        for (var j =0; j< match.length; j++)
        {

          if (match[6][j] != null)
            outcome[match[6][j]] = parseInt(match[7][j])/1000
        }

        game =
        {
          ...game,
          outcomes: outcome
        } 

        odds[match[2][0]][match[2][1]].push(game)
        i = i + 1
    }


    return odds;
}

export const getAllVaults = async () => {
    let web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
    let contract = new web3.eth.Contract(VAULTMANAGER_ABI, VAULTMANAGER_ADDY);
    let vaults = await contract.methods.getAllVaults().call()


    let all_vaults = []
    for (const vault of vaults)
    {
        let vault_contract = new web3.eth.Contract(VAULT_ABI, vault);
        let details = await vault_contract.methods.getVaultDetails().call()
        
        let curr = {}
        curr['ADDRESS'] = vault
        curr['VAULT_NAME'] = details[0]
        curr['PROVIDER'] = details[3]
        curr['IMBALANCE_FROM'] = details[4]
        curr['IMBALANCE_RATIO'] = details[5]
        curr['LP_ENABLED'] = details[6]
        curr['VOLUME'] = 0
        curr['EXPECTED_APR'] = 0
        curr['STATUS'] = 'ACTIVE'
        curr['data'] = [5000,6000,6500,7000] 
        curr['mainColor'] = "#4591ff"
        all_vaults.push(curr)
    }

    // console.log(all_vaults)
    return all_vaults

}

export const createVault = async (values) => {
    let web3 = store.getState().user.web3;
    let contract = new web3.eth.Contract(VAULTMANAGER_ABI, VAULTMANAGER_ADDY);
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);

    let account = await web3.eth.getAccounts()
    let userAddress = account[0];

    if (values.fundSize > 0){
        let x = await token_contract.methods.allowance(userAddress, BET_ADDY).call()
        if (x < values.fundSize)
        {
            await token_contract.methods.approve(VAULTMANAGER_ADDY, MaxUint256).send({from: userAddress})
        }
    }

    await contract.methods.createVault(values.vaultName, values.providerAddress, values.vigorish, values.riskTolerance, values.allowExternalLP, values.fundSize).send({from: userAddress})
    return true;
}

export const makeBet = async (ids, picks, amounts) => {
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

const getUserDaiBalance = async (web3,userAddress) =>{
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

export const handleLiqChange = async () => {
    // const [totalShares, totalDAI] = await getPoolLiquidity();
    // store.dispatch(setLiqDisplayValue(totalShares + " Shares, " + totalDAI + " DAI"))

    // const [userShares, userDAI] = await getUserLiquidity();
    // store.dispatch(setUserStakeValue(userShares + " Shares, " + userDAI + " DAI"))

    // let [lockedShares, lockedDAI] = await getUserHold();
    // store.dispatch(setbalanceHoldValue(lockedShares + " Shares, " + lockedDAI + " DAI"))

    // store.dispatch((setWithdrawableValue((userShares-lockedShares) + " Shares, " + (userDAI-lockedDAI) + " DAI")))
}

const subscribeNewBlock = async (web3,userAddress) =>{
    web3.eth.subscribe("newBlockHeaders",(err,result)=>{
        if(err){
            console.error(err)
            return
        }      
        if(result){
            getUserDaiBalance(web3,userAddress);
            handleLiqChange();
            getMyBets();
            getSettledBets();
        }
    })
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
                getChainName()
                if(!preferUsernameFlag){
                    store.dispatch(setPreferUsername(userAddress,preferUserName));
                    store.dispatch(setPreferUsernameFlag(userAddress));
                    store.dispatch(setPreferAvatarStyle(userAddress,"robot"));
                }
                getUserDaiBalance(web3,userAddress);
                subscribeNewBlock(web3,userAddress);
                getMyBets();
                getSettledBets();
            }   
    }catch(e){
        console.error("Can not retrieve account")
        console.error(e)
    }
}

export const getChainName = async () => {
    let web3 = store.getState().user.web3
    let networkType = await web3.eth.net.getNetworkType();
    store.dispatch(setCurrentNetwork(networkType))
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
        subscribeNewBlock(web3,userAddress);
        getMyBets();
        getSettledBets();

    }
}

export const getBetLimit = async (ids) => {
    
    let id_only = []
    ids.map((text, index) => {
        id_only.push(text.split('/')[0]);
    })

    let web3 = store.getState().user.web3 || new Web3(new Web3.providers.WebsocketProvider(WSS_PROVIDER));
    let contract = new web3.eth.Contract(BET_ABI, BET_ADDY);

    try{
    let limit = await contract.methods.getLiquidityLimit(id_only).call()
    let exactLimit = parseFloat(web3.utils.fromWei(String(limit), 'ether')).toFixed(2);
    return exactLimit;}
    catch{
        return 0;
    }
}