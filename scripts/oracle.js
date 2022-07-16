const axios = require('axios')
const { ethers } = require("hardhat");
const {DAI_ABI, DAI_ADDY, HTTP_PROVIDER, WSS_PROVIDER, VAULT_ABI, BET_ABI, BET_ADDY, MARKETS_ABI, MARKETS_ADDY, VAULTMANAGER_ABI, VAULTMANAGER_ADDY} = require("../src/config")

sports = [
            {'key': 'americanfootball_ncaaf', 'group': 'American Football', 'title': 'NCAAF'},
            {'key': 'americanfootball_nfl', 'group': 'American Football', 'title': 'NFL'},
            {'key': 'soccer_usa_mls', 'group': 'Soccer', 'title': 'MLS'},
            {'key': 'soccer_epl', 'group': 'Soccer', 'title': 'EPL'},
            {'key': 'soccer_spain_la_liga', 'group': 'Soccer', 'title': 'La Liga - Spain'},
            {'key': 'soccer_italy_serie_a', 'group': 'Soccer', 'title': 'Serie A - Italy'},
            {'key': 'soccer_fifa_world_cup', 'group': 'Soccer', 'title': 'FIFA World Cup'},
        ]


function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
}
        

async function oracle(){

    const MyContract = await ethers.getContractFactory("Markets");
    const markets = await MyContract.attach(MARKETS_ADDY);
    
    let matches = await markets.getAllMarkets()
    let all_matches = {}

    for (const match of matches) {
        let match_detail = await markets.marketDetailsById(match).call()

        if (match_detail[9] == true)
            all_matches['id'] = match_detail
    }

    console.log(all_matches)

    for (const row of sports){
        let res = await axios.get(`https://api.the-odds-api.com/v4/sports/${row['key']}/scores?apiKey=${process.env.ODDS_API}&daysFrom=1`);

        for (const details of res.data){
            if (details['completed'] == true){                
                if (details['id'] in all_matches){
                    //settleBet
                }
            }
        }

        

        

        if ((details['id'] in all_matches) == false){
            console.log(details)
            await market.startMarket(toTimestamp(match['commence_time']), match['match'], [sport, league], outcome, new_odds)
        }
    }
    console.log()
}

//run every 5 mins or so
oracle()