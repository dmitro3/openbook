const { ethers } = require("hardhat");
const axios = require('axios')
const {MARKETS_ADDY} = require("../src/config")


// get all markets and set odds

async function update_odds(){

    sports = [
        {'key': 'americanfootball_ncaaf', 'group': 'American Football', 'title': 'NCAAF'},
        {'key': 'americanfootball_nfl', 'group': 'American Football', 'title': 'NFL'},
        {'key': 'soccer_usa_mls', 'group': 'Soccer', 'title': 'MLS'},
        {'key': 'soccer_epl', 'group': 'Soccer', 'title': 'EPL'},
        {'key': 'soccer_spain_la_liga', 'group': 'Soccer', 'title': 'La Liga - Spain'},
        {'key': 'soccer_italy_serie_a', 'group': 'Soccer', 'title': 'Serie A - Italy'},
        {'key': 'soccer_fifa_world_cup', 'group': 'Soccer', 'title': 'FIFA World Cup'},
    ]

    //Set odds in an easy to access dictionary
    for (const row of sports){
        let res2 = await axios.get(`https://api.the-odds-api.com/v4/sports/${row['key']}/odds?regions=uk&markets=h2h&apiKey=${process.env.ODDS_API}&daysFrom=1`);
        
    }

    // const MyContract = await ethers.getContractFactory("Markets");
    // const markets = await MyContract.attach(MARKETS_ADDY);

    // let matches = await markets.getAllMarkets()

    // for (const match of matches) {
    //     let match_detail = await markets.marketDetailsById(match)

    //     console.log(match_detail['id'], match_detail['matchTimestamp'])

    //     if (match_detail['active'] == true){

    //     }
    // }
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