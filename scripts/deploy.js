const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { promises: { readdir } } = require('fs')
const fs = require("fs");
const { ethers } = require("hardhat");
require('dotenv').config()

const Web3 = require('web3');
const { ConstructionOutlined } = require('@mui/icons-material');

let contracts = {};
let connection = {}
let signer;

if (process.env.HARDHAT_NETWORK == 'kovan'){
    contracts['DAI'] = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'
    connection['PROVIDER'] = 'https://eth-kovan.alchemyapi.io/v2/HEbnEOx1ZKSDnssxjxDbsPS3LykdVbup'
    connection['WSS'] = 'wss://eth-kovan.alchemyapi.io/v2/HEbnEOx1ZKSDnssxjxDbsPS3LykdVbup'
} else if (process.env.HARDHAT_NETWORK == 'localhost'){
    contracts['DAI'] = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
    connection['PROVIDER'] = 'http://127.0.0.1:8545'
    connection['WSS'] = 'ws://127.0.0.1:8545'
      
}
 
let erc20ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "guy", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "wad", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Withdrawal", "type": "event" }]

let DAI = contracts['DAI'];
let PROVIDER = connection['PROVIDER'];
let WSS = connection['WSS'];

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
}

async function perform_whale_transfer() {

    let WHALE_ADDY = "0xF977814e90dA44bFA03b6295A0616a897441aceC"

    //Transfer from a whale to our account to run tests
    const whale_signer = await ethers.getImpersonatedSigner(WHALE_ADDY);


    DAI_CONTRACT = await ethers.getContractAt(erc20ABI, DAI, whale_signer);
    USER_DAI = await ethers.getContractAt(erc20ABI, DAI, signer);
    const FUND_AMOUNT = (BigInt(30000)*BigInt(10**18)).toString()

    for (let addy of [signer.address, '0xDF2f2cda0110fB8424EAc1239AfA00Ab9976c9d9', '0x99c6fD3bC02dEB420F192eFb3ED0D6f479856D4B', '0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd']) {

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

        signer = await ethers.getImpersonatedSigner("0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd");
        await perform_whale_transfer()
    }

    
    let abis = await exec("yarn run hardhat export-abi")
    let path = './abi/contracts'
    let dir = await readdir(path, { withFileTypes: true })

    let ABI_STRING = "const HTTP_PROVIDER ='" +  connection['PROVIDER'] + "'\nlet WSS_PROVIDER='" +  connection['WSS']  + "'\nlet DAI_ADDY='" + DAI + "'\n\n"
    ABI_STRING = ABI_STRING + 'const DAI_ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "guy", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "wad", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Withdrawal", "type": "event" }];' + '\n\n';


    let export_string = "module.exports = {DAI_ABI, DAI_ADDY, HTTP_PROVIDER, WSS_PROVIDER, VAULT_ABI, "

    dir.forEach((value) => {
        let name = value.name

        if (name.includes(".sol")){
            let full_path = path + "/" + name + "/" + name.replace(".sol", ".json");
            let contents = fs.readFileSync(full_path).toString().replace(/(\r\n|\n|\r)/gm,"")

            let var_name = name.replace(".sol", "").toUpperCase()
            
            ABI_STRING = ABI_STRING + "let " + var_name + "_ABI" + " = " + contents.replace(/\s/g, '') + "\n\n"           
            
            
            if (var_name != "VAULT")
                export_string = export_string + var_name + "_ABI, " + var_name + "_ADDY, "
        }
    })
    export_string = export_string.substring(0, export_string.length - 2);
    export_string = export_string + "}"

    const Market = await ethers.getContractFactory("Markets", signer);
    let market = await Market.deploy(0);
    await market.deployed();  
    console.log("Market Contract Deployed at " + market.address);

    console.log(await market.oracle())

    ABI_STRING = ABI_STRING + "let MARKETS_ADDY='" + market.address + "'\n"

    const BetContract = await ethers.getContractFactory("Bet", signer);
    let bet = await BetContract.deploy(DAI, market.address);
    await bet.deployed();  
    console.log("Bet Contract Deployed at " + bet.address);

    ABI_STRING = ABI_STRING + "let BET_ADDY='" + bet.address + "'\n\n"


    const VaultManager = await ethers.getContractFactory("VaultManager", signer);

    let vault = await VaultManager.deploy(DAI, market.address, bet.address);
    console.log("VaultManager Contract Deployed at " + vault.address);

    await vault.createVault("OpenBook Official Vault", "0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd", 3, 3, true, 0);
    console.log("Default Vault Deployed");

    ABI_STRING = ABI_STRING + "let VAULTMANAGER_ADDY='" + vault.address + "'\n"


    await market.setBetContract(bet.address);
    await market.setVaultMgrContract(vault.address);

    ABI_STRING = ABI_STRING + export_string
    fs.writeFileSync('src/config.js', ABI_STRING);   
}


if (require.main === module) {
    deploy()
}

module.exports = {deploy, toTimestamp}