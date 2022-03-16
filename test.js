var fs = require('fs');


function flatten(curr, rem='id'){
    var dict = {};

    for (var i = 0; i < curr.length; i++) { 
        id = curr[i][rem];
        delete curr[i][rem];
        dict[id] = curr[i];
    }

    return dict;
}

var obj = JSON.parse(fs.readFileSync('odds.json', 'utf8'));
console.log(flatten(obj.Soccer.EPL))