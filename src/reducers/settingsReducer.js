const settingsReducer = (state = {
    oddsFormat: "decimal",
    preferUsername: "",
    preferUsernameFlag: false
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
                    preferUsername: action.payload
                }
                break;
            case "SET_PREFER_USERNAME_FLAG":
                state ={
                    ...state,
                    preferUsernameFlag: true
                }
                break;
      }
      return state;
  };

export default settingsReducer;