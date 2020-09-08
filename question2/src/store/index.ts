import { createStore } from "redux";
import rootReducer from "./reducers";


const initialState = {};

/* eslint-disable no-underscore-dangle */
const store = createStore(
    rootReducer,
    initialState
);
/* eslint-enable */
export default store;