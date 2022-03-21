export function setOddsFormat(oddsFormat){
    return {
        type: "SET_ODDS_FORMAT",
        payload: oddsFormat
    }  
}

export function setPreferUsername(preferUserName){
    return {
        type: "SET_PREFER_USERNAME",
        payload: preferUserName
    }
}

export function setPreferUsernameFlag(){
    return{
        type: "SET_PREFER_USERNAME_FLAG",
        payload: ""
    }
}
