import {combineReducers} from "@reduxjs/toolkit";
import tokenReducer from "./token.reducer";
import customerReducer from "./customer.reducer";

const rootReducer = combineReducers({
    token: tokenReducer,
    customer: customerReducer,
});

export default rootReducer;