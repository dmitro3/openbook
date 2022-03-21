const oddsReducer = (state = {
    userAddress: null,
    web3: null,
    contract: null,
    provider: null,
    web3Loading: true,
    loggedIn: false,
    preferUsername: null
  }, action) => {
      switch (action.type) {
            case "LOG_IN":
                state = {
                    ...state,
                    userAddress : action.payload,
                    loggedIn: true
                    }   
                    break;
                case "LOG_OUT":
                    state = {
                        ...state,
                        userAddress : "",
                        loggedIn: false
                    }   
                    break;
                case "SET_WEB3":
                    state = {
                        ...state,
                        web3: action.payload
                    }
                    break;
                 case "SET_PROVIDER":
                state = {
                    ...state,
                    provider: action.payload
                    }
                    break;
                case "SET_WEB3_LOADING":
                    state = {
                        ...state,
                        web3Loading: action.payload
                    }
                    break;
      }
      return state;
  };

export default oddsReducer;