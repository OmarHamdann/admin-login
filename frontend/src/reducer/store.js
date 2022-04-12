import { combineReducers, createStore } from "redux";

import loginReducer from "./login";

import usersReducer from "./users/users";

const reducers = combineReducers({ loginReducer,usersReducer });

const store = createStore(reducers);

export default store;