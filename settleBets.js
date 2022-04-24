const {LIQUIDITY_ABI, LIQUIDITY_ADDY, BET_ABI, BET_ADDY, MARKET_ABI, MARKET_ADDY, DAI_ABI, DAI_ADDY} = require("./src/config")
const Web3 = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
let private = "9a3609a0d72d681eb901bc822724593ad63d3feb32cc9e92c4b801750964a1ad";

const account = web3.eth.accounts.privateKeyToAccount('0x' + private);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;


async function settle(){
    let market = new web3.eth.Contract(MARKET_ABI, MARKET_ADDY);
    await market.methods.settleMarkets([2, 3, 4, 5, 6], [1, 0, 1, 0, 2]).send({from: account.address, gas: 500000})
}