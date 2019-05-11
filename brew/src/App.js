import React, {Component} from 'react';
import {platform, IOS} from './lib/platform';
const osname = platform();

import './App.css'; // This is IMPORTANT import.
import './test.less' // Delete this on production.

class App extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="App">
                <div className="logo">
                    <img src="https://cdn.dribbble.com/users/85713/screenshots/3775213/herbal_dribble.gif" width={200} alt="Green Tea"/>
                    <h1>Заварилось!</h1>
                    <p>Если Вы видите этот экран, значит все <b>заварилось</b> успешно!</p>
                </div>
            </div>
        );
    }
}

export default App;
