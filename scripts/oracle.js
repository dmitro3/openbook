const axios = require('axios')
const { ethers } = require("hardhat");
const {DAI_ABI, DAI_ADDY, HTTP_PROVIDER, WSS_PROVIDER, VAULT_ABI, BET_ABI, BET_ADDY, MARKETS_ABI, MARKETS_ADDY, VAULTMANAGER_ABI, VAULTMANAGER_ADDY} = require("../src/config")



function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
}
        

async function initiate_oracle(){

    sports = [
        {'key': 'americanfootball_ncaaf', 'group': 'American Football', 'title': 'NCAAF'},
        {'key': 'americanfootball_nfl', 'group': 'American Football', 'title': 'NFL'},
        {'key': 'soccer_usa_mls', 'group': 'Soccer', 'title': 'MLS'},
        {'key': 'soccer_epl', 'group': 'Soccer', 'title': 'EPL'},
        {'key': 'soccer_spain_la_liga', 'group': 'Soccer', 'title': 'La Liga - Spain'},
        {'key': 'soccer_italy_serie_a', 'group': 'Soccer', 'title': 'Serie A - Italy'},
        {'key': 'soccer_fifa_world_cup', 'group': 'Soccer', 'title': 'FIFA World Cup'},
    ]

    const MyContract = await ethers.getContractFactory("Markets");
    const markets = await MyContract.attach(MARKETS_ADDY);
    
    let matches = await markets.getAllMarkets()
    let all_matches = {}

    for (const match of matches) {
        let match_detail = await markets.marketDetailsById(match)

        if (match_detail[8] == true)
            all_matches['id'] = match_detail
    }

    for (const row of sports){
        let res = await axios.get(`https://api.the-odds-api.com/v4/sports/${row['key']}/scores?apiKey=${process.env.ODDS_API}&daysFrom=1`);

        for (const details of res.data){
            if (details['completed'] == true){                
                if (details['id'] in all_matches){
                    //settleBet
                }
            }
        }

        
        let res2 = await axios.get(`https://api.the-odds-api.com/v4/sports/${row['key']}/odds?regions=uk&markets=h2h&apiKey=${process.env.ODDS_API}&daysFrom=1`);

        
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

                console.log(event['id'], toTimestamp(event['commence_time']), [event['home_team'], event['away_team']], [row['group'], row['title']], outcomes_lst)

                await markets.startMarket(event['id'], toTimestamp(event['commence_time']), [event['home_team'], event['away_team']], [row['group'], row['title']], outcomes_lst)
            }
        }

        if (process.env.HARDHAT_NETWORK == 'localhost'){
            break;
        }
    }
}

if (require.main === module) {
    initiate_oracle()
}

module.exports = {initiate_oracle}