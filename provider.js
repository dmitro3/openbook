const {LIQUIDITY_ABI, LIQUIDITY_ADDY, BET_ABI, BET_ADDY, MARKET_ABI, MARKET_ADDY, DAI_ABI, DAI_ADDY} = require("./src/config")
const Web3 = require('web3');
const {MaxUint256} = require("@ethersproject/constants");

let web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
let private = "9a3609a0d72d681eb901bc822724593ad63d3feb32cc9e92c4b801750964a1ad";

const account = web3.eth.accounts.privateKeyToAccount('0x' + private);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }

async function perform(){
       
    let token_contract = new web3.eth.Contract(DAI_ABI, DAI_ADDY);
    await token_contract.methods.approve(LIQUIDITY_ADDY, MaxUint256).send({from: account.address, gas: 122000})


    let market = new web3.eth.Contract(MARKET_ABI, MARKET_ADDY);

    let data = require('./odds.json');

        for (sport in data){
            for (league in data[sport]){
                for (var match of data[sport][league]){
                    let new_outcome = new Map()
                    let curr_odds = Object.values(match['outcomes'])
                    let outcome = Object.keys(match['outcomes'])

                    // if (match['outcomes']["X"] !== undefined){
                    //     outcome = ['1', 'X', '2']
                    //     curr_odds = [ match['outcomes']['1'], match['outcomes']['X'], match['outcomes']['2']]
                    // }

                    let new_odds = []

                    for (var odd of curr_odds)
                        new_odds.push(parseInt(odd * 1000))
                    

                    await market.methods.startMarket(toTimestamp(match['timestamp']), match['match'], [sport, league], outcome, new_odds).send({from: account.address, gas: 500000})
                }
            }
        }
}


async function getMatches(){
    let contract = new web3.eth.Contract(MARKET_ABI, MARKET_ADDY);

    let matches = await contract.methods.getAllMarkets().call()
    console.log(matches)
    let all_matches = []

    for (const match of matches) {
        let match_detail = await contract.methods.marketDetailsById(match).call()
        all_matches.push(match_detail)
    }
}

async function updateOdds(){
    let market = new web3.eth.Contract(MARKET_ABI, MARKET_ADDY);
    await market.methods.updateOdds(3, [2000, 1500]).send({from: account.address, gas: 500000})

}

updateOdds()
// async function main(){
//     await perform()
//     await getMatches()
// }

// main()