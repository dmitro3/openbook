const axios = require('axios')
const {VAULTMANAGER_ADDY, VAULTMANAGER_ABI, VAULT_ABI, MARKETS_ADDY, MARKETS_ABI, HTTP_PROVIDER} = require("../src/config")
const Web3 = require("web3")

async function update_odds(){
    const web3 = new Web3(HTTP_PROVIDER);
    const account = web3.eth.accounts.privateKeyToAccount("0x" + process.env.ETH_KEY);

    //manually set to your vault
    let contract = new web3.eth.Contract(VAULTMANAGER_ABI, VAULTMANAGER_ADDY);
    let vaults = await contract.methods.getAllVaults().call()
    let vault = vaults[0]


    let market_contract = new web3.eth.Contract(MARKETS_ABI, MARKETS_ADDY);
    let matches = await market_contract.methods.getAllMarkets().call()

    let match_details = []
    
    for (const match of matches) {
        let curr_details = await market_contract.methods.marketDetailsById(match).call()

        if (curr_details['active'] == true){
            match_details[match] = curr_details
        }
    }

    console.log(match_details)

    // let vault_contract = new web3.eth.Contract(VAULT_ABI, vault);
    // console.log(vault)
    
    // sports = [
    //     {'key': 'americanfootball_ncaaf', 'group': 'American Football', 'title': 'NCAAF'},
    //     {'key': 'americanfootball_nfl', 'group': 'American Football', 'title': 'NFL'},
    //     {'key': 'soccer_usa_mls', 'group': 'Soccer', 'title': 'MLS'},
    //     {'key': 'soccer_epl', 'group': 'Soccer', 'title': 'EPL'},
    //     {'key': 'soccer_spain_la_liga', 'group': 'Soccer', 'title': 'La Liga - Spain'},
    //     {'key': 'soccer_italy_serie_a', 'group': 'Soccer', 'title': 'Serie A - Italy'},
    //     {'key': 'soccer_fifa_world_cup', 'group': 'Soccer', 'title': 'FIFA World Cup'},
    // ]

    // let odds = {}

    // //Set odds in an easy to access dictionary
    // for (const row of sports){
    //     let res2 = await axios.get(`https://api.the-odds-api.com/v4/sports/${row['key']}/odds?regions=uk&markets=h2h&apiKey=${process.env.ODDS_API}&daysFrom=1`);


    //     for (const event of res2.data){

    //         let odds = {};

    //         for (let outcomes in event['bookmakers']){
    //             for (let outcome in event['bookmakers'][outcomes]['markets'][0]['outcomes']){

    //                 let sel = event['bookmakers'][outcomes]['markets'][0]['outcomes'][outcome]

    //                 if (sel['name'] == event['home_team'])
    //                     odds["1"] = sel['price']

    //                 if (sel['name'] == event['away_team'])
    //                     odds["2"] = sel['price']

    //                 if (sel['name'] == "Draw")
    //                     odds["X"] = sel['price']

    //             }
    //         }

    //         console.log(event['home_team'], event['away_team'],  odds)

    //         if (process.env.HARDHAT_NETWORK == 'localhost'){
    //             break;
    //         }
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