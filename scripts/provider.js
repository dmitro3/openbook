const { ethers } = require("hardhat");
const axios = require('axios')
const {MARKETS_ADDY} = require("../src/config")


// get all markets and set odds

async function update_odds(){
    const MyContract = await ethers.getContractFactory("Markets");
    const markets = await MyContract.attach(MARKETS_ADDY);

    let matches = await markets.getAllMarkets()
    let all_matches = {}

    for (const match of matches) {
        let match_detail = await markets.marketDetailsById(match)

        console.log(match_detail['id'], match_detail['matchTimestamp'])

        if (match_detail[8] == true)
            all_matches[match_detail['id']] = match_detail
    }

    console.log(all_matches)
}

update_odds()

//add odds for games deemed



// let data = require('../odds.json');

// for (sport in data){
//     for (league in data[sport]){
//         for (var match of data[sport][league]){
//             let new_outcome = new Map()
//             let curr_odds = Object.values(match['outcomes'])
//             let outcome = Object.keys(match['outcomes'])

//             let new_odds = []

//             for (var odd of curr_odds)
//                 new_odds.push(parseInt(odd * 1000))

//                 await market.startMarket(match['id'], toTimestamp(match['timestamp']), match['match'], [sport, league], outcome, new_odds)

            
//             }
//     }
// }