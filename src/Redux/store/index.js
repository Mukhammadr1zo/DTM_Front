import { combineReducers, createStore } from "redux";

import subjectsReducer from "../reducers/subjectsReducer";
import facultiesReducer from "../reducers/facultiesReducer";

const rootReducer = combineReducers({
    subjectsReducer,
    facultiesReducer
})

export const store = createStore(rootReducer)