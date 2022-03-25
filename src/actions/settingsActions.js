export function setOddsFormat(oddsFormat){
    return {
        type: "SET_ODDS_FORMAT",
        payload: oddsFormat
    }  
}

export function setPreferUsername(userAddress,preferUsername){
    return {
        type: "SET_PREFER_USERNAME",
        payload: {[userAddress]:preferUsername}
    }
}

export function setPreferUsernameFlag(userAddress){
    return{
        type: "SET_PREFER_USERNAME_FLAG",
        payload: {[userAddress]:true}
    }
}

export function setPreferAvatarStyle(userAddress,preferAvatarStyle){
    return {
        type: "SET_PREFER_AVATAR_STYLE",
        payload: {[userAddress]:preferAvatarStyle}
    }
}

export function setDisconnected(disconnected){
    return{
        type: "SET_DISCONNECTED",
        payload: disconnected
    }
}
