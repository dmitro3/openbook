//Mock Settlement script
const {MARKETS_ABI, MARKETS_ADDY, HTTP_PROVIDER} = require("./src/config")
const Web3 = require('web3');
require('dotenv').config()

async function settle(){
    let web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
    const account = web3.eth.accounts.privateKeyToAccount('0x' + process.env.ETH_KEY);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    let market = new web3.eth.Contract(MARKETS_ABI, MARKETS_ADDY);
    await market.methods.settleMarket(2, 1).send({from: account.address, gas: 500000})
}

settle()