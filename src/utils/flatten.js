export const flatten = (curr) => {
    var dict = {};

    for (var i = 0; i < curr.length; i++) { 
        dict[curr[i]['id']] = curr[i];
    }

    return dict;
}