export function setOdds(odds){
    return {
        type: "SET_ODDS",
        payload: odds
    }
}

export function setUnFormattedOdds(unformattedOdds){
    return {
        type: "SET_UNFORMATTED_ODDS",
        payload: unformattedOdds
    }
}