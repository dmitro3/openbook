const oddsReducer = (state = {
    oddsDict: {},
  }, action) => {
      switch (action.type) {
            case "SET_ODDS":
                state = {
                    ...state,
                    oddsDict: action.payload
                }   
                break;
      }
      return state;
  };

export default oddsReducer;