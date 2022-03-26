const oddsReducer = (state = {
    oddsDict: {},
    unformattedOddsDict: {}
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
        }
      return state;
  };

export default oddsReducer;