import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import firebase from "firebase/app";

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
