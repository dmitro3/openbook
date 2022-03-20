const flatten = (curr) => {
    var dict = {};

    for (var i = 0; i < curr.length; i++) { 
        dict[curr[i]['id']] = curr[i];
    }

    return dict;
}

export const getOdds = () =>{
    let data = require('@root/odds.json');
    let all_league_data_array = []
    Object.values(data).map((item,index)=>{
        return Object.values(item).map((item2,index2)=>{
            all_league_data_array.push(flatten(item2))
        })
    })
    let all_league_data_obj = Object.assign({},...all_league_data_array);
    // console.log(all_league_data_obj)
    return all_league_data_obj;
}

