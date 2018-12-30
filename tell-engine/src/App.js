import React, {Component} from 'react';
import {platform, IOS} from './lib/platform';
const osname = platform();

import './test.less';

class App extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="App">
                <div className="logo">
                    <img src="https://cdn.dribbble.com/users/85713/screenshots/3775213/herbal_dribble.gif" width={200} alt="Green Tea"/>
                </div>
            </div>
        );
    }
}

export default App;
