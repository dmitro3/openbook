const axios = require('axios')

sports = [
            {'key': 'americanfootball_ncaaf', 'group': 'American Football', 'title': 'NCAAF'},
            {'key': 'americanfootball_nfl', 'group': 'American Football', 'title': 'NFL'},
            {'key': 'soccer_usa_mls', 'group': 'Soccer', 'title': 'MLS'},
            {'key': 'soccer_epl', 'group': 'Soccer', 'title': 'EPL'},
            {'key': 'soccer_spain_la_liga', 'group': 'Soccer', 'title': 'La Liga - Spain'},
            {'key': 'soccer_italy_serie_a', 'group': 'Soccer', 'title': 'Serie A - Italy'},
            {'key': 'soccer_fifa_world_cup', 'group': 'Soccer', 'title': 'FIFA World Cup'},
        ]



async function oracle(){

    for (const row of sports){
        url = `https://api.the-odds-api.com/v4/sports/${row['key']}/scores?apiKey=${process.env.ODDS_API}&daysFrom=1`
        

        break
    }
    console.log()
}


oracle()