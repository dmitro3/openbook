const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { promises: { readdir } } = require('fs')
const fs = require("fs");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const {update_odds} = require("./provider")
const axios = require('axios')
require('dotenv').config()

console.log(process.env.ODDS_API)

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
 


if (process.env.HARDHAT_NETWORK == 'localhost'){
    
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

    for (let addy of [signer.address, '0xDF2f2cda0110fB8424EAc1239AfA00Ab9976c9d9', '0x99c6fD3bC02dEB420F192eFb3ED0D6f479856D4B']) {

        await DAI_CONTRACT.transfer(addy, FUND_AMOUNT, {
            from: WHALE_ADDY,
        });


        await whale_signer.sendTransaction({
            to: addy,
            value: ethers.utils.parseEther("1")
        });
    }
}

async function updateOracleOnce(){
    //This will create and settle markets
    //https://api.the-odds-api.com/v4/sports?apiKey=&all=true
    sports = [
        {'key': 'americanfootball_ncaaf', 'group': 'American Football', 'title': 'NCAAF'},
        {'key': 'americanfootball_nfl', 'group': 'American Football', 'title': 'NFL'},
        {'key': 'soccer_usa_mls', 'group': 'Soccer', 'title': 'MLS'},
        {'key': 'soccer_epl', 'group': 'Soccer', 'title': 'EPL'},
        {'key': 'soccer_spain_la_liga', 'group': 'Soccer', 'title': 'La Liga - Spain'},
        {'key': 'soccer_italy_serie_a', 'group': 'Soccer', 'title': 'Serie A - Italy'},
        {'key': 'soccer_fifa_world_cup', 'group': 'Soccer', 'title': 'FIFA World Cup'},
    ]

    const {MARKETS_ADDY} = require("../src/config")


    let MyContract = await ethers.getContractFactory("Markets")

    

    const markets = await MyContract.attach(MARKETS_ADDY);
    
    let matches = await markets.getAllMarkets()
    let all_matches = {}

    for (const match of matches) {
        let match_detail = await markets.marketDetailsById(match)

        if (match_detail['active'] == true)
            all_matches[match_detail['id']] = match_detail
    }

    for (const row of sports){
        let res = await axios.get(`https://api.the-odds-api.com/v4/sports/${row['key']}/scores?apiKey=${process.env.ODDS_API}&daysFrom=1`);

        for (const details of res.data){
            if (details['completed'] == true){                
                if (details['id'] in all_matches){
                    details['scores'][0]['score']
                    details['scores'][0]['name']

                    details['scores'][1]['score']
                    details['scores'][1]['score']

                    //https://api.the-odds-api.com/v4/sports/soccer_italy_serie_a/scores?apiKey=0abaea50bbee7801d5d2da8f8b95393f&daysFrom=3
                    //fix the settlement

                    //we can manually settle too lol

                    // await markets.settleMarket(details['id'], 1)
                }
            }
        }

        
        let res2 = await axios.get(`https://api.the-odds-api.com/v4/sports/${row['key']}/odds?regions=uk&markets=h2h&apiKey=${process.env.ODDS_API}&daysFrom=1`);

        let count = 0

        for (const event of res2.data){
            if ((event['id'] in all_matches) == false){
                let outcomes_lst = ['1']
                let draw_found = false;
                
                for (let outcomes in event['bookmakers']){
                    for (let outcome in event['bookmakers'][outcomes]['markets'][0]['outcomes']){

                        let sel = event['bookmakers'][outcomes]['markets'][0]['outcomes'][outcome]
                        if (sel['name'] == 'Draw'){
                            draw_found = true
                        }
                    }
                }

                outcomes_lst.push('2')
                
                if (draw_found == true){
                    outcomes_lst.push('X')
                }

                
                count = count + 1
                
                if (process.env.HARDHAT_NETWORK == 'localhost'){
                    if (count > 5)
                        break
                }

                console.log(event['id'], toTimestamp(event['commence_time']), [event['home_team'], event['away_team']], [row['group'], row['title']], outcomes_lst)
                await markets.startMarket(event['id'], toTimestamp(event['commence_time']), [event['home_team'], event['away_team']], [row['group'], row['title']], outcomes_lst)
            }
        }

        if (process.env.HARDHAT_NETWORK == 'localhost'){
            break;
        }
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

    const Market = await ethers.getContractFactory("Markets");
    let market = await Market.deploy(0);
    await market.deployed();  
    console.log("Market Contract Deployed at " + market.address);

    ABI_STRING = ABI_STRING + "let MARKETS_ADDY='" + market.address + "'\n"

    const BetContract = await ethers.getContractFactory("Bet");
    let bet = await BetContract.deploy(DAI, market.address);
    await bet.deployed();  
    console.log("Bet Contract Deployed at " + bet.address);

    ABI_STRING = ABI_STRING + "let BET_ADDY='" + bet.address + "'\n\n"


    const VaultManager = await ethers.getContractFactory("VaultManager");

    let vault = await VaultManager.deploy(DAI, market.address, bet.address);
    console.log("VaultManager Contract Deployed at " + vault.address);

    await vault.createVault("OpenBook Official Vault", "0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd", 3, 3, true, 0);
    console.log("Default Vault Deployed");

    ABI_STRING = ABI_STRING + "let VAULTMANAGER_ADDY='" + vault.address + "'\n"


    await market.setBetContract(bet.address);
    await market.setVaultMgrContract(vault.address);

    ABI_STRING = ABI_STRING + export_string
    fs.writeFileSync('src/config.js', ABI_STRING);   

    console.log("Updating oracle")
    await updateOracleOnce()
    console.log("Updating odds")
    await update_odds()
}


if (require.main === module) {
    deploy()
}
