const Web3 = require("web3")
const {VAULTMANAGER_ADDY, VAULTMANAGER_ABI, VAULT_ABI, MARKETS_ADDY, MARKETS_ABI, HTTP_PROVIDER} = require("./src/config")

async function test(){
    console.log(HTTP_PROVIDER)
    const web3 = new Web3(HTTP_PROVIDER);
    let market_contract = new web3.eth.Contract(MARKETS_ABI, MARKETS_ADDY);
    let matches = await market_contract.methods.getAllMarkets().call()
    console.log(matches)
}

test()