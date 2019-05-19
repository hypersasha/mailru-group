import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'; // This is IMPORTANT import.
import App from './App';
import * as serviceWorker from './serviceWorker';
import connect from '@vkontakte/vkui-connect';

connect.send('VKWebAppInit', {});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
