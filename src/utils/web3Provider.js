import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
const {DAI_ABI, DAI_ADDY, HTTP_PROVIDER, WSS_PROVIDER, VAULT_ABI, BET_ABI, BET_ADDY, MARKETS_ABI, MARKETS_ADDY, VAULTMANAGER_ABI, VAULTMANAGER_ADDY} = require("../config")
const {MaxUint256} = require("@ethersproject/constants");
var ethers_m = require('ethers');  

//redux
import {setProvider,setWeb3,setWeb3Loading,setEthers,logIn,logOut,setHasWeb3True,setHasProviderTrue, setBalance, setPoolLiquidity, setUserLiquidity, setCurrentNetwork} from "redux/actions/userActions";
import {setPreferUsername,setPreferUsernameFlag,setPreferAvatarStyle} from "redux/actions/settingsActions";
import {setSettledBets,setUnsettledBets} from "redux/actions/accountActions";
import {store} from "../redux/store"
import { setVaultsData } from '@actions/vaultsAction';

export const checkAndGetWeb3 =  async () => {
    const provider = await detectEthereumProvider();
    if(provider){
        const web3 = new Web3(provider);
        const ethers = new ethers_m.providers.Web3Provider(provider)
        store.dispatch(setProvider(provider));
        store.dispatch(setWeb3(web3));
        store.dispatch(setEthers(ethers));
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
    if(store.getState().user.hasProvider){
        try{
            requestMetaMask()
            return true;
        }
        catch(error){
            console.error("connectMetaMask ERROR")
            console.error(error);
        }
    }
    else{
        console.error("Cannot connect MetaMask, try reload browser!")
        return false;
    }
} 
 
export const addLiquidity = async (vault, amount) => {
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

export const removeLiquidity = async (vault, amount) => {
    let web3 = store.getState().user.web3;
    let account = await web3.eth.getAccounts()
    let userAddress = account[0];

    let contract = new web3.eth.Contract(VAULT_ABI, vault.ADDRESS);
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);

    let supply = await contract.methods.balanceOf(userAddress, 0).call()


    amount = parseInt(amount)
    let amt = BigInt(10 ** 18) * BigInt(amount)
    



    let exactAmt = web3.utils.toWei(String(amount), 'ether')

    console.log(exactAmt, userAddress)

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
        
        if (bet_detail['punter'] == userAddress)
        {
            let match_details = await match_contract.methods.marketDetailsById(bet_detail['gameId']).call()
            
            

            let res = {}
            res['bet_time'] = bet_detail['timestamp']
            res['game_time'] = match_details['matchTimestamp']
            res['league'] = match_details['match_details'][1]
            res['game'] = match_details['names'].join(' vs ')
            
            if (bet_detail['betIndex'] == '2')
                res['bet'] = "Draw"
            else
                res['bet'] = match_details[1][bet_detail['betIndex']]

            res['stake'] = web3.utils.fromWei(String(bet_detail['bet_amount']), 'ether')
            res['return'] = web3.utils.fromWei(String(bet_detail['to_win']), 'ether')
            res['odds'] = parseFloat(res['return']/res['stake']).toFixed(2);
            res['result'] = bet['vault']

            if (match_details['active'] == true)
            {
                res['result'] = "😰"
            }
            else{
                if (match_details['winnerIndex'] == bet_detail[3])
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
    let vaults = []
    let idx = 0
    for (const bet of bets) 
    {

        let bet_detail = await contract.methods.betDetailsByID(bet).call()

        if (bet_detail['punter'] == userAddress)
        {
            claims.push(bet)
            indexes.push(idx)
            vaults.push(bet_detail['vault'])

        }
        idx = idx + 1
    }
    
    let res = await contract.methods.withdrawBets(claims, indexes, vaults).send({from: userAddress})
    
    if (res == true)
    {

    }
}

export const getMatches = async (vault) => {
    console.log("getting")
    let web3 = null;
    store.getState().user.hasWeb3 ? web3 = store.getState().user.web3 : web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
    let contract = new web3.eth.Contract(MARKETS_ABI, MARKETS_ADDY);
    let matches = await contract.methods.getAllMarkets().call()
    console.log("All Matches", matches)

    
    let vault_contract = new web3.eth.Contract(VAULT_ABI, vault.ADDRESS);
    let odds = {}
    let i = 0;

    for (const match of matches) {
        let match_details = await contract.methods.marketDetailsById(match).call()

        if ((match_details['active'] == true) && (match_details['matchTimestamp'] < new Date().getTime())){
            let game = {
                timestamp : new Date(match_details['matchTimestamp']* 1000),
                id: match,
                match: match_details['names']
            }

            try{
                let curr_odds = await vault_contract.methods.getOddsById(match).call()

                if (!(match_details['match_details'][0] in odds))
                    odds[match_details['match_details'][0]] = {}
            
                if (!(match_details['match_details'][1] in odds[match_details['match_details'][0]]))
                    odds[match_details['match_details'][0]][match_details['match_details'][1]] = []
            

                let outcome = {}
            
                for (var j =0; j< match_details['match_details'].length; j++)
                {
        
                    if (match_details['bets'][j] != null)
                        outcome[match_details['bets'][j]] = parseInt(curr_odds[j])/1000
                }
            
                game =  {
                            ...game,
                            outcomes: outcome
                        } 
                    
                odds[match_details['match_details'][0]][match_details['match_details'][1]].push(game)
            } catch {
                
            }
            i = i + 1
        }
    }


    return odds;
}

export const getAllVaults = async () => {

    let web3 = null;
    store.getState().user.hasWeb3 ? web3 = store.getState().user.web3 : web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
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

export const makeBet = async (vault, ids, picks, amounts) => {
    console.log("Vault is" + vault)
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


    await contract.methods.createBets(ids, new_picks, newAmts, vault).send({from: userAddress})
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
    let web3 = store.getState().user.web3;
    let account = await web3.eth.getAccounts()

    let contract = new web3.eth.Contract(VAULTMANAGER_ABI, VAULTMANAGER_ADDY);
    let vaults = await contract.methods.getAllVaults().call()
    let dai_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);
    var vaultsData = {}

    for (const vault of vaults)
    {
        vaultsData[vault] = {}
        vaultsData[vault]['DAI'] = {}
        vaultsData[vault]['Shares'] = {}

        let vault_contract = new web3.eth.Contract(VAULT_ABI, vault);
        
        let res = await dai_contract.methods.balanceOf(vault).call()
        console.log(vault, res)
        vaultsData[vault]['DAI']['total'] = parseFloat(web3.utils.fromWei(String(res), 'ether')).toFixed(2);

        let res2 = await vault_contract.methods.getTotalSupply().call()
        vaultsData[vault]['Shares']['total'] = parseFloat(web3.utils.fromWei(String(res2), 'ether')).toFixed(2);        

        let res3 = await vault_contract.methods.balanceOf(account[0], 0).call()
        vaultsData[vault]['Shares']['user'] =  parseFloat(web3.utils.fromWei(String(res3), 'ether')).toFixed(2);


        let exactDAI = await vault_contract.methods.getShareValue(res3).call()
        vaultsData[vault]['DAI']['user'] =  parseFloat(web3.utils.fromWei(String(exactDAI), 'ether')).toFixed(2);

        let details = await vault_contract.methods.getUserLockedShares(account[0]).call()
        let exactAmt =  parseFloat(web3.utils.fromWei(String(details), 'ether')).toFixed(2);


        let locked = await vault_contract.methods.getLockedShares().call()
        let lockedDAI = await vault_contract.methods.getShareValue(locked).call()

        vaultsData[vault]['Shares']['locked']  =  parseFloat(web3.utils.fromWei(String(locked), 'ether')).toFixed(2);
        vaultsData[vault]['DAI']['locked'] =  parseFloat(web3.utils.fromWei(String(lockedDAI), 'ether')).toFixed(2);


        vaultsData[vault]['Shares']['withdrawable'] = parseFloat(vaultsData[vault]['Shares']['user'] - vaultsData[vault]['Shares']['locked']).toFixed(2)
        vaultsData[vault]['DAI']['withdrawable'] = parseFloat(vaultsData[vault]['DAI']['user'] - vaultsData[vault]['DAI']['locked']).toFixed(2)
    }

    store.dispatch(setVaultsData(vaultsData))
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
        let web3 = null;
        let provider = null;
        let ethers = null;
        if(store.getState().user.hasWeb3 && store.getState().user.hasProvider && store.getState().user.ethers){
            web3 = store.getState().user.web3;
            provider = store.getState().user.provder;
            ethers = store.getState().user.ethers;
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
    try{
        let web3 = null;
        let provider = null;
        let ethers = null;
        if(store.getState().user.hasWeb3 && store.getState().user.hasProvider && store.getState().user.ethers){
            web3 = store.getState().user.web3;
            provider = store.getState().user.provder;
            ethers = store.getState().user.ethers;
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
            subscribeNewBlock(web3,userAddress);
            getMyBets();
            getSettledBets();
        }   
    }catch(e){
        console.error("Can not retrieve account")
        console.error(e)
    }
}

export const getBetLimit = async (ids, vault) => {
    
    
    let id_only = []
    ids.map((text, index) => {
        id_only.push(text.split('/')[0]);
    })

    let web3 = store.getState().user.web3 || new Web3(new Web3.providers.WebsocketProvider(WSS_PROVIDER));
    let contract = new web3.eth.Contract(VAULT_ABI, vault);

    try{
        let limit = await contract.methods.getLiquidityLimit(id_only).call()
        let exactLimit = parseFloat(web3.utils.fromWei(String(limit), 'ether')).toFixed(2);
        return exactLimit;
    }
    catch{
        return 0;
    }
}