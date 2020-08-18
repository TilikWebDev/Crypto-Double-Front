import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/redux-store';
import App from './App';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('body')
);
