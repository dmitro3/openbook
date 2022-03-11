const betSlipReducer = (state = {
    betSlipOutcomeArray: [],
  }, action) => {
      switch (action.type) {
            case "ADD_BET_SLIP_OUTCOME":
                let matchID = action.payload.split('/')[0];
                let re = new RegExp(matchID);
                let sameMatchExist = state.betSlipOutcomeArray.some(e => re.test(e));
                if(!state.betSlipOutcomeArray.includes(action.payload) && !sameMatchExist){
                    state = {
                        ...state,
                        betSlipOutcomeArray: [...state.betSlipOutcomeArray, action.payload]
                    }
                }
                else
                {
                    state = {
                        ...state
                    }
                }
                break;
            case "REMOVE_BET_SLIP_OUTCOME":
                let removeIndex = state.betSlipOutcomeArray.indexOf(action.payload);
                if(removeIndex !== -1){
                    state.betSlipOutcomeArray.splice(removeIndex,1);
                    state = {
                        ...state,
                        betSlipOutcomeArray: state.betSlipOutcomeArray
                    }
                }
                else{
                    state = {
                        ...state
                    }
                }
                break;
            case "REMOVE_ALL_BEST_SLIP_OUTCOMES":
                state ={
                    ...state,
                    betSlipOutcomeArray: []
                }
                break;
      }
      return state;
  };

export default betSlipReducer;