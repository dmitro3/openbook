const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { promises: { readdir } } = require('fs')
const fs = require("fs");
const { ethers } = require("hardhat");


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

async function main(){
    let abis = await exec("yarn run hardhat export-abi")
    let path = './abi/contracts'
    let dir = await readdir(path, { withFileTypes: true })

    let ABI_STRING = "const HTTP_PROVIDER ='" +  PROVIDER + "'\nlet WSS_PROVIDER='" +  WSS  + "'\nlet DAI_ADDY='" + DAI + "'\n\n"
    ABI_STRING = ABI_STRING + 'const DAI_ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "guy", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "wad", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "guy", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "dst", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "src", "type": "address" }, { "indexed": false, "name": "wad", "type": "uint256" }], "name": "Withdrawal", "type": "event" }];' + '\n\n';


    let export_string = "module.exports = {DAI_ABI, DAI_ADDY, HTTP_PROVIDER, WSS_PROVIDER, "

    dir.forEach((value) => {
        let name = value.name

        if (name.includes(".sol")){
            let full_path = path + "/" + name + "/" + name.replace(".sol", ".json");
            let contents = fs.readFileSync(full_path).toString()

            let var_name = name.replace(".sol", "").toUpperCase()
            
            ABI_STRING = ABI_STRING + "let " + var_name + "_ABI" + " = " + contents + "\n\n"           
            
            export_string = export_string + var_name + "_ABI, " + var_name + "_ADDY, "
        }
    })
    export_string = export_string.substring(0, export_string.length - 2);
    export_string = export_string + "}"

    const Market = await ethers.getContractFactory("Markets");
    market = await Market.deploy(0);
    await market.deployed();  
    console.log("Market Contract Deployed at " + market.address);

    ABI_STRING = ABI_STRING + "let MARKETS_ADDY='" + market.address + "'\n"


    const VaultManager = await ethers.getContractFactory("VaultManager");
    vault = await VaultManager.deploy(DAI, market.address);
    await vault.deployed();  
    console.log("VaultManager Contract Deployed at " + vault.address);

    ABI_STRING = ABI_STRING + "let VAULTMANAGER_ADDY='" + vault.address + "'\n"


    ABI_STRING = ABI_STRING + export_string
    fs.writeFileSync('config.js', ABI_STRING);
}

main()