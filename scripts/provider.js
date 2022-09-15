const axios = require('axios')
const {VAULTMANAGER_ADDY, VAULTMANAGER_ABI, VAULT_ABI, MARKETS_ADDY, MARKETS_ABI, HTTP_PROVIDER} = require("../src/config")
const Web3 = require("web3")
const {toTimestamp} = require("./deploy")


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
            if ((league in odds[sport]) == false){
                odds[sport][league] = []
            }
        
            let key = odds_directory[sport][league]
            let res2 = await axios.get(`https://api.the-odds-api.com/v4/sports/${key}/odds?regions=uk&markets=h2h&apiKey=${process.env.ODDS_API}&daysFrom=1`);
            
            for (const event of res2.data){    
                let curr_odds = {}

                for (let outcomes in event['bookmakers']){
                    for (let outcome in event['bookmakers'][outcomes]['markets'][0]['outcomes']){
    
                        let sel = event['bookmakers'][outcomes]['markets'][0]['outcomes'][outcome]

                        if (sel['name'] == event['home_team'])
                            curr_odds["1"] = sel['price']
    
                        if (sel['name'] == event['away_team'])
                            curr_odds["2"] = sel['price']
    
                        if (sel['name'] == "Draw")
                            curr_odds["X"] = sel['price']
                        


                        
                    }
                }

                let curr_details = {}

                curr_details['home'] = event['home_team']
                curr_details['away'] = event['away_team']
                curr_details['time'] = event['commence_time']

                curr_details['odds'] = curr_odds

                odds[sport][league].push(curr_details)
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
    return [match_details, sports]
}

async function updateOddsOnce() {
    const web3 = new Web3(HTTP_PROVIDER);
    const account = web3.eth.accounts.privateKeyToAccount("0x" + process.env.ETH_KEY);

    let [platform_matches, platform_sports] = await get_platform_matches(web3)
    let api_odds = await get_api_odds(platform_sports)

    let mgr_contract = new web3.eth.Contract(VAULTMANAGER_ABI, VAULTMANAGER_ADDY);
    let vaults = await mgr_contract.methods.getAllVaults().call()
    let vault = vaults[0]
    let vault_contract = new web3.eth.Contract(VAULT_ABI, vault);


    for (let match in platform_matches){
        let match_details = platform_matches[match]
        let sel = api_odds[match_details['match_details'][0]][match_details['match_details'][1]]

        for (let api_details of sel){
            //you will be using a different API provider. In those case use match['names'] 
            if ((match_details['names'][0] == api_details['home'] && match_details['names'][1] == api_details['away']) | (match_details['names'][1] == api_details['home'] && match_details['names'][0] == api_details['away'])){ 
                if (toTimestamp(api_details['time']) == match_details['matchTimestamp']){ //some platforms might have to do with n minutes check
                    if (JSON.stringify(Object.keys(api_details['odds'])) == JSON.stringify(match_details['bets'])){
                        let new_odds = Object.values(api_details['odds'])
                        new_odds = new_odds.map(x => x * 1000);
                        await vault_contract.methods.updateOdds(match, new_odds).send({'from': account.address})

                    }

                }           
            }
        }
    }
}

async function runOdds(){
    await updateOddsOnce()
    setTimeout(runOdds, 5000);
}

if (require.main === module) {
    runOdds()
}

module.exports = {updateOddsOnce}