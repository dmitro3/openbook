const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { promises: { readdir } } = require('fs')
const fs = require("fs");
const { ethers } = require("hardhat");
const hre = require("hardhat");

const Web3 = require('web3');

let KOVAN_DAI = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
let KOVAN_PROVIDER = 'https://eth-kovan.alchemyapi.io/v2/HEbnEOx1ZKSDnssxjxDbsPS3LykdVbup'
let KOVAN_WSS = "wss://eth-kovan.alchemyapi.io/v2/HEbnEOx1ZKSDnssxjxDbsPS3LykdVbup"

let LOCALHOST_DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
let LOCALHOST_PROVIDER = 'http://127.0.0.1:8545'
let LOCALHOST_WSS = "ws://127.0.0.1:8545"

let DAI;
let PROVIDER;
let WSS;

let mode = 'LOCAL'

async function send_localhost_whale(){
    let [owner] = await ethers.getSigners();
    const FUND_AMOUNT = (BigInt(30000)*BigInt(10**18)).toString()


    const { DAI_ADDY, WHALE_ADDY, erc20ABI } = require("./test_config")

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [WHALE_ADDY],
      });

    const whale_signer = await ethers.provider.getSigner(WHALE_ADDY);

    DAI = await ethers.getContractAt(erc20ABI, DAI_ADDY, whale_signer);
    USER_DAI = await ethers.getContractAt(erc20ABI, DAI_ADDY, owner);

    await DAI.transfer(owner.address, FUND_AMOUNT, {
        from: WHALE_ADDY,
        });

    
    await whale_signer.sendTransaction({
        to: owner.address,
        value: ethers.utils.parseEther("1")
    });

    for (let addy of ['0xDF2f2cda0110fB8424EAc1239AfA00Ab9976c9d9', '0x99c6fD3bC02dEB420F192eFb3ED0D6f479856D4B', '0xFf83517542B4587AAC87DEa0976675569dE0dc8D', '0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd', '0x91b098c80f0FD05464915A41253AB816804Cd5E8', '0x4cdC8c8bf707748b617deB9e5bcBF8c00C7F289B', '0xaC4312942D8B40cbFB0Fa322f775414E9318f4E0']) {

        await DAI.transfer(addy, FUND_AMOUNT, {
            from: WHALE_ADDY,
        });


        await whale_signer.sendTransaction({
            to: addy,
            value: ethers.utils.parseEther("1")
        });
    }
}

if (mode == 'LOCAL')
{
    DAI = LOCALHOST_DAI
    PROVIDER = LOCALHOST_PROVIDER
    WSS = LOCALHOST_WSS

}
else if (mode == 'KOVAN')
{
    DAI = KOVAN_DAI
    PROVIDER = KOVAN_PROVIDER
    WSS = KOVAN_WSS
}   




function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }




async function deploy(){
    if (mode == 'LOCAL'){
        send_localhost_whale()
    }

    // let abis = await exec("yarn run hardhat export-abi")
    // let path = './abi/contracts'
    // let dir = await readdir(path, { withFileTypes: true })

    // let ABI_STRING = "const HTTP_PROVIDER ='" +  PROVIDER + "'\nlet WSS_PROVIDER='" +  WSS  + "'\nlet DAI_ADDY='" + DAI + "'\n\n"
    // ABI_STRING = ABI_STRING + 'const DAI_ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "guy", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "wad", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Withdrawal", "type": "event" }];' + '\n\n';


    // let export_string = "module.exports = {DAI_ABI, DAI_ADDY, HTTP_PROVIDER, WSS_PROVIDER, "

    // dir.forEach((value) => {
    //     let name = value.name

    //     if (name.includes(".sol")){
    //         let full_path = path + "/" + name + "/" + name.replace(".sol", ".json");
    //         let contents = fs.readFileSync(full_path).toString()

    //         let var_name = name.replace(".sol", "").toUpperCase()
            
    //         ABI_STRING = ABI_STRING + "let " + var_name + "_ABI" + " = " + contents + "\n\n"           
            
            
    //         if (var_name != "VAULT")
    //             export_string = export_string + var_name + "_ABI, " + var_name + "_ADDY, "
    //     }
    // })
    // export_string = export_string.substring(0, export_string.length - 2);
    // export_string = export_string + "}"

    // let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
    // const signer = new ethers.Wallet("9a3609a0d72d681eb901bc822724593ad63d3feb32cc9e92c4b801750964a1ad", provider);

    // const Market = await ethers.getContractFactory("Markets");
    // market = await Market.deploy(0);
    // await market.connect(signer).deployed();  
    // console.log("Market Contract Deployed at " + market.address);

    // ABI_STRING = ABI_STRING + "let MARKETS_ADDY='" + market.address + "'\n"


    // const VaultManager = await ethers.getContractFactory("VaultManager");
    // vault = await VaultManager.deploy(DAI, market.address);
    // await vault.connect(signer).deployed();  
    // console.log("VaultManager Contract Deployed at " + vault.address);

    // ABI_STRING = ABI_STRING + "let VAULTMANAGER_ADDY='" + vault.address + "'\n"


    // const BetContract = await ethers.getContractFactory("Bet");
    // bet = await BetContract.deploy(DAI, market.address);
    // await bet.connect(signer).deployed();  
    // console.log("Bet Contract Deployed at " + bet.address);

    // ABI_STRING = ABI_STRING + "let BET_ADDY='" + bet.address + "'\n\n"


    // await market.connect(signer).setBetContract(bet.address);
    // await market.connect(signer).setVaultMgrContract(vault.address);

    // ABI_STRING = ABI_STRING + export_string
    // fs.writeFileSync('src/config.js', ABI_STRING);

    // //now add matches

    // let data = require('./odds.json');

    // for (sport in data){
    //     for (league in data[sport]){
    //         for (var match of data[sport][league]){
    //             let new_outcome = new Map()
    //             let curr_odds = Object.values(match['outcomes'])
    //             let outcome = Object.keys(match['outcomes'])

    //             // if (match['outcomes']["X"] !== undefined){
    //             //     outcome = ['1', 'X', '2']
    //             //     curr_odds = [ match['outcomes']['1'], match['outcomes']['X'], match['outcomes']['2']]
    //             // }

    //             let new_odds = []

    //             for (var odd of curr_odds)
    //                 new_odds.push(parseInt(odd * 1000))
                
    //                 await market.connect(signer).startMarket(toTimestamp(match['timestamp']), match['match'], [sport, league], outcome, new_odds)

                
    //             }
    //     }
    // }


}



deploy()