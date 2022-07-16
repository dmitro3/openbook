const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { promises: { readdir } } = require('fs')
const fs = require("fs");
const { ethers } = require("hardhat");
const hre = require("hardhat");

const Web3 = require('web3');
const { ConstructionOutlined } = require('@mui/icons-material');

let KOVAN_DAI = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
let KOVAN_PROVIDER = 'https://eth-kovan.alchemyapi.io/v2/HEbnEOx1ZKSDnssxjxDbsPS3LykdVbup'
let KOVAN_WSS = "wss://eth-kovan.alchemyapi.io/v2/HEbnEOx1ZKSDnssxjxDbsPS3LykdVbup"

let LOCALHOST_DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
let LOCALHOST_PROVIDER = 'http://127.0.0.1:8545'
let LOCALHOST_WSS = "ws://127.0.0.1:8545"

const DAI_ADDY = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WHALE_ADDY = "0xf977814e90da44bfa03b6295a0616a897441acec";
let erc20ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "guy", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "wad", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Withdrawal", "type": "event" }]

let DAI;
let PROVIDER;
let WSS;


if (process.env.HARDHAT_NETWORK == 'localhost')
{
    DAI = LOCALHOST_DAI
    PROVIDER = LOCALHOST_PROVIDER
    WSS = LOCALHOST_WSS

}
else if (process.env.HARDHAT_NETWORK == 'kovan')
{
    DAI = KOVAN_DAI
    PROVIDER = KOVAN_PROVIDER
    WSS = KOVAN_WSS
}   




function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }

async function perform_whale_transfer() {
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [WHALE_ADDY],
      });

    //get signer
    [owner] = await ethers.getSigners();



    //Transfer from a whale to our account to run tests
    const whale_signer = await ethers.provider.getSigner(WHALE_ADDY);


    DAI_CONTRACT = await ethers.getContractAt(erc20ABI, DAI_ADDY, whale_signer);
    USER_DAI = await ethers.getContractAt(erc20ABI, DAI_ADDY, owner);
    const FUND_AMOUNT = (BigInt(30000)*BigInt(10**18)).toString()

    await DAI_CONTRACT.transfer(owner.address, FUND_AMOUNT, {
        from: WHALE_ADDY,
        });

    
    await whale_signer.sendTransaction({
        to: owner.address,
        value: ethers.utils.parseEther("1")
    });

    for (let addy of ['0xDF2f2cda0110fB8424EAc1239AfA00Ab9976c9d9', '0x99c6fD3bC02dEB420F192eFb3ED0D6f479856D4B', '0xFf83517542B4587AAC87DEa0976675569dE0dc8D', '0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd', '0x91b098c80f0FD05464915A41253AB816804Cd5E8', '0x4cdC8c8bf707748b617deB9e5bcBF8c00C7F289B', '0xaC4312942D8B40cbFB0Fa322f775414E9318f4E0']) {

        await DAI_CONTRACT.transfer(addy, FUND_AMOUNT, {
            from: WHALE_ADDY,
        });


        await whale_signer.sendTransaction({
            to: addy,
            value: ethers.utils.parseEther("1")
        });
    }
}


async function deploy(){

    if (process.env.HARDHAT_NETWORK == 'localhost'){
        await perform_whale_transfer()
    }


    let abis = await exec("yarn run hardhat export-abi")
    let path = './abi/contracts'
    let dir = await readdir(path, { withFileTypes: true })

    let ABI_STRING = "const HTTP_PROVIDER ='" +  PROVIDER + "'\nlet WSS_PROVIDER='" +  WSS  + "'\nlet DAI_ADDY='" + DAI + "'\n\n"
    ABI_STRING = ABI_STRING + 'const DAI_ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "guy", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "wad", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Withdrawal", "type": "event" }];' + '\n\n';


    let export_string = "module.exports = {DAI_ABI, DAI_ADDY, HTTP_PROVIDER, WSS_PROVIDER, VAULT_ABI, "

    dir.forEach((value) => {
        let name = value.name

        if (name.includes(".sol")){
            let full_path = path + "/" + name + "/" + name.replace(".sol", ".json");
            let contents = fs.readFileSync(full_path).toString()

            let var_name = name.replace(".sol", "").toUpperCase()
            
            ABI_STRING = ABI_STRING + "let " + var_name + "_ABI" + " = " + contents + "\n\n"           
            
            
            if (var_name != "VAULT")
                export_string = export_string + var_name + "_ABI, " + var_name + "_ADDY, "
        }
    })
    export_string = export_string.substring(0, export_string.length - 2);
    export_string = export_string + "}"

    const Market = await ethers.getContractFactory("Markets");
    let market = await Market.deploy(0);
    await market.deployed();  
    console.log("Market Contract Deployed at " + market.address);

    ABI_STRING = ABI_STRING + "let MARKETS_ADDY='" + market.address + "'\n"

    const VaultManager = await ethers.getContractFactory("VaultManager");
    let vault = await VaultManager.deploy(DAI, market.address);
    console.log("VaultManager Contract Deployed at " + vault.address);

    await vault.createVault("OpenBook Official Vault", "0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd", 3, 3, true, 0);
    console.log("Default Vault Deployed");

    ABI_STRING = ABI_STRING + "let VAULTMANAGER_ADDY='" + vault.address + "'\n"


    const BetContract = await ethers.getContractFactory("Bet");
    let bet = await BetContract.deploy(DAI, market.address);
    await bet.deployed();  
    console.log("Bet Contract Deployed at " + bet.address);

    ABI_STRING = ABI_STRING + "let BET_ADDY='" + bet.address + "'\n\n"


    await market.setBetContract(bet.address);
    await market.setVaultMgrContract(vault.address);

    ABI_STRING = ABI_STRING + export_string
    fs.writeFileSync('src/config.js', ABI_STRING);

    //now add matches

    let data = require('../odds.json');

    for (sport in data){
        for (league in data[sport]){
            for (var match of data[sport][league]){
                let new_outcome = new Map()
                let curr_odds = Object.values(match['outcomes'])
                let outcome = Object.keys(match['outcomes'])

                let new_odds = []

                for (var odd of curr_odds)
                    new_odds.push(parseInt(odd * 1000))

                    await market.startMarket(toTimestamp(match['timestamp']), match['match'], [sport, league], outcome, new_odds)

                
                }
        }
    }
}

deploy()