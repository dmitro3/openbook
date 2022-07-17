const axios = require('axios')
const {VAULTMANAGER_ADDY, VAULTMANAGER_ABI, VAULT_ABI, MARKETS_ADDY, MARKETS_ABI, HTTP_PROVIDER} = require("../src/config")
const Web3 = require("web3")


async function get_api_odds(platform_sports){

    let odds_directory = {'American Football': 
                                                {'NCAAF': 'americanfootball_ncaaf', 
                                                'NFL': 'americanfootball_nfl'},
                          'Soccer': 
                                    {'MLS': 'soccer_usa_mls', 
                                    'EPL': 'soccer_epl',
                                    'La Liga - Spain': 'soccer_spain_la_liga',
                                    'Serie A - Italy': 'soccer_italy_serie_a',
                                    'FIFA World Cup': 'soccer_fifa_world_cup'
                                },

                        }
    
    let odds = {}

    //Set odds in an easy to access dictionary
    for (var sport in platform_sports){
        odds[sport] = {}

        for (var league of platform_sports[sport]){
            odds[sport][league] = []

            let key = odds_directory[sport][league]
            let res2 = await axios.get(`https://api.the-odds-api.com/v4/sports/${key}/odds?regions=uk&markets=h2h&apiKey=${process.env.ODDS_API}&daysFrom=1`);
            
            for (const event of res2.data){    
                for (let outcomes in event['bookmakers']){
                    for (let outcome in event['bookmakers'][outcomes]['markets'][0]['outcomes']){
    
                        let sel = event['bookmakers'][outcomes]['markets'][0]['outcomes'][outcome]
                        let curr_odds = {}
                        let curr_details = {}

                        if (sel['name'] == event['home_team'])
                            curr_odds["1"] = sel['price']
    
                        if (sel['name'] == event['away_team'])
                            curr_odds["2"] = sel['price']
    
                        if (sel['name'] == "Draw")
                            curr_odds["X"] = sel['price']
                        


                        curr_details['home'] = event['home_team']
                        curr_details['away'] = event['away_team']
                        curr_details['time'] = event['commence_time']

                        curr_details['odds'] = curr_odds

                        odds[sport][league].push(curr_details)
                        break
                    }
                }    
            }
        }
    }

    return odds
}

async function get_platform_matches(web3){
    let market_contract = new web3.eth.Contract(MARKETS_ABI, MARKETS_ADDY);
    let matches = await market_contract.methods.getAllMarkets().call()

    let match_details = []
    let sports = {}
    
    for (const match of matches) {
        let curr_details = await market_contract.methods.marketDetailsById(match).call()

        if (curr_details['active'] == true){
            match_details[match] = curr_details

            let curr_sport = curr_details['match_details'][0]
            let curr_league = curr_details['match_details'][1]

            if ((curr_sport in sports) == false) {
                sports[curr_sport] = []
            }

            
            if ((sports[curr_sport].includes(curr_league)) == false){
                sports[curr_sport].push(curr_league)
            }
        }
    }
    return match_details, sports
}

async function update_odds(){
    const web3 = new Web3(HTTP_PROVIDER);
    const account = web3.eth.accounts.privateKeyToAccount("0x" + process.env.ETH_KEY);

    let platform_matches, platform_sports = await get_platform_matches(web3)
    console.log(platform_sports)
    let api_odds = await get_api_odds(platform_sports)
    

    console.log(api_odds)

    // //manually set to your vault
    // let mgr_contract = new web3.eth.Contract(VAULTMANAGER_ABI, VAULTMANAGER_ADDY);
    // let vaults = await mgr_contract.methods.getAllVaults().call()
    // let vault = vaults[0]
    // let vault_contract = new web3.eth.Contract(VAULT_ABI, vault);



    // compare api odds with vault. Change odds if different.
    
 
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