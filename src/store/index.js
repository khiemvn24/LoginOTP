import { createStore, combineReducers } from "redux";
import Reducers from "./reducers";
const RootReducers = combineReducers({
  // reducers
  Reducers,
});

export const store = createStore(RootReducers);