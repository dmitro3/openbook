const oddsReducer = (state = {
    oddsDict: {},
    unformattedOddsDict: {},
    isOddsLoading: true

  }, action) => {
      switch (action.type) {
            case "SET_ODDS":
                state = {
                    ...state,
                    oddsDict: action.payload
                }   
                break;
            case "SET_UNFORMATTED_ODDS":
                state = {
                    ...state,
                    unformattedOddsDict: action.payload
                }
                break;
            case "SET_IS_ODDS_LOADING_False":
                state = {
                    ...state,
                    isOddsLoading: false
                }
                break;
        }
      return state;
  };

export default oddsReducer;