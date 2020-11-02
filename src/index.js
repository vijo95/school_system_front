import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import authReducer from './store/reducers/auth'

import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer,composeEnhances(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


