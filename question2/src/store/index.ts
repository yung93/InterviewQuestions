import { createStore, compose } from "redux";
import rootReducer from "./reducers";


const initialState = {};

/* eslint-disable no-underscore-dangle */
const store = createStore(
    rootReducer,
    initialState,
    compose,
);
/* eslint-enable */
export default store;