let data = require('./odds.json');

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }

for (sport in data){
    
    for (league in data[sport])
    {
        for (var match of data[sport][league])
        {
            console.log(toTimestamp(match['timestamp']), match['match'], sport, league, Object.keys(match['outcomes']), Object.values(match['outcomes']), match['id'])
        }
    }
}