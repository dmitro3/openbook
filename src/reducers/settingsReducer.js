const settingsReducer = (state = {
    oddsFormat: "decimal",
    preferUsername: {},
    preferUsernameFlag: {},
    preferAvatarStyle: {}
  }, action) => {
      switch (action.type) {
            case "SET_ODDS_FORMAT":
                state = {
                    ...state,
                    oddsFormat: action.payload
                }   
                break;
            case "SET_PREFER_USERNAME":
                state ={
                    ...state,
                    preferUsername: Object.assign({},state.preferUsername,action.payload)
                }
                break;
            case "SET_PREFER_USERNAME_FLAG":
                state ={
                    ...state,
                    preferUsernameFlag: Object.assign({},state.preferUsernameFlag,action.payload)
                }
                break;
            case "SET_PREFER_AVATAR_STYLE":
                state = {
                    ...state,
                    preferAvatarStyle: Object.assign({},state.preferAvatarStyle,action.payload)
                }
      }
      return state;
  };

export default settingsReducer;