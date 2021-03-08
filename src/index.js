import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
/**
 * Redux
 * */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMddieware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
// Reducer
import Reducer from './redux/reducer/index';

const createStoreWithMiddleware = applyMiddleware(promiseMddieware, ReduxThunk)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION()
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
