import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";
import favoriteMatchReducer from "./reducers/favoriteMatchReducer";
import betSlipReducer from "./reducers/betSlipReducer";

// Development Only
import logger from 'redux-logger';
import mathReducer from "./reducers/mathReducer";
import userReducer from "./reducers/userReducer";

// const store = createStore(
//     combineReducers({math: mathReducer, user: userReducer, favoriteMatch:favoriteMatchReducer,betSlip:betSlipReducer}),
//     {},
//     bindMiddleware(logger,thunk,promise)
// );

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
     // I require this only in dev environment
      const { composeWithDevTools } = require("redux-devtools-extension");
      return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
  };
  
export const makeStore = () => {
    const rootReducer = combineReducers({math: mathReducer, user: userReducer, favoriteMatch:favoriteMatchReducer,betSlip:betSlipReducer});
    const store = createStore(
        rootReducer,
        bindMiddleware([logger,thunk,promise])
    );
    return store;
};

const store = makeStore();



export default store;