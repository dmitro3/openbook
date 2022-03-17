const flatten = (curr) => {
    var dict = {};

    for (var i = 0; i < curr.length; i++) { 
        dict[curr[i]['id']] = curr[i];
    }

    return dict;
}

export const getOdds = () =>{
    let data = require('@root/odds.json');
    let EPL_data = data.Soccer.EPL;
    let flatten_PPL_data = flatten(EPL_data);
    return flatten_PPL_data;
}

