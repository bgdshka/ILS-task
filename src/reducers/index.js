import { combineReducers } from "redux";
import orders from "./orders";

let rootReducer = combineReducers({
  orders,
});

export default rootReducer;
