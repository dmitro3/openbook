const settingsReducer = (state = {
    oddsFormat: "decimal"
  }, action) => {
      switch (action.type) {
            case "SET_ODDS_FORMAT":
                state = {
                    ...state,
                    oddsFormat: action.payload
                }   
                break;
      }
      return state;
  };

export default settingsReducer;