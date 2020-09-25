import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, combineReducers, createStore, compose } from 'redux';
//import reducer from "./store/reducer";
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

//const store = createStore(reducer);
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
})

//middleware
const logger = store => {
    return next => {
        return action => {
            console.log("[MiddleWare] Dispatch", action);
            const result = next(action);
            console.log("[MiddleWare]", store.getState());
            return result;
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
