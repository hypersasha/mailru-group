import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'; // This is IMPORTANT import.
import * as serviceWorker from './serviceWorker';
import connect from '@vkontakte/vkui-connect';
import AppRouter from "./Router";

connect.send('VKWebAppInit', {});

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
