import {flatten} from "./flatten";

export const getOdds = () =>{
    let data = require('../../odds.json');
    let EPL_data = data.Soccer.EPL;
    let flatten_PPL_data = flatten(EPL_data);
    return flatten_PPL_data;
}