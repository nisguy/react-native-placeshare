import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import placesReducer from "./reducers/places";
import UIReducer from "./reducers/UI";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  places: placesReducer,
  UI: UIReducer,
  auth: authReducer
});

const composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
