import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk'
import App from './components/App';
import reducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

