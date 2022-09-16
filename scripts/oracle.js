const { ethers } = require("hardhat");
const {MARKETS_ADDY} = require("../src/config")
const axios = require('axios')
const {toTimestamp} = require("./deploy")

async function updateOracleOnce(){
    //This will create and settle markets
    //https://api.the-odds-api.com/v4/sports?apiKey=&all=true
    sports = [
        {'key': 'americanfootball_ncaaf', 'group': 'American Football', 'title': 'NCAAF'},
        {'key': 'americanfootball_nfl', 'group': 'American Football', 'title': 'NFL'},
        {'key': 'soccer_epl', 'group': 'Soccer', 'title': 'EPL'},
        {'key': 'soccer_spain_la_liga', 'group': 'Soccer', 'title': 'La Liga - Spain'},
        {'key': 'soccer_italy_serie_a', 'group': 'Soccer', 'title': 'Serie A - Italy'},
        {'key': 'soccer_fifa_world_cup', 'group': 'Soccer', 'title': 'FIFA World Cup'},
    ]


    let signer = await ethers.getImpersonatedSigner("0x5664198BDb6AB7337b70742ff4BDD935f81e4Dcd");

    let MyContract = await ethers.getContractFactory("Markets", signer)
    const markets = await MyContract.attach(MARKETS_ADDY);

    let matches = await markets.getAllMarkets()
    let all_matches = {}

    for (const match of matches) {
        let match_detail = await markets.marketDetailsById(match)

        if (match_detail['active'] == true)
            all_matches[match_detail['id']] = match_detail
    }

    for (const row of sports){
        //manual settlement
        // let res = await axios.get(`https://api.the-odds-api.com/v4/sports/${row['key']}/scores?apiKey=${process.env.ODDS_API}&daysFrom=1`);

        // for (const details of res.data){
        //     if (details['completed'] == true){                
        //         if (details['id'] in all_matches){
        //             details['scores'][0]['score']
        //             details['scores'][0]['name']

        //             details['scores'][1]['score']
        //             details['scores'][1]['score']

        //             //https://api.the-odds-api.com/v4/sports/soccer_italy_serie_a/scores?apiKey=0abaea50bbee7801d5d2da8f8b95393f&daysFrom=3
        //             //fix the settlement

        //             //we can manually settle too lol

        //             // await markets.settleMarket(details['id'], 1)
        //         }
        //     }
        // }

        
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

        // if (process.env.HARDHAT_NETWORK == 'localhost'){
        //     break;
        // }
    }
}

async function runOracle(){
    await updateOracleOnce()
    setTimeout(runOracle, 5000);
}

if (require.main === module) {
    runOracle()
}

module.exports = {updateOracleOnce}