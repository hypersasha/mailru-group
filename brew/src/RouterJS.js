import React, {Component} from 'react';
import './index.css';
import './App.css'; // This is IMPORTANT import.
import App from './App';
import App1 from './App1';
import NoMatch from './NoMatch';

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";


class RouterJS extends Component {
    render() {
        return (
            <BrowserRouter>
{/*                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
                <hr />*/}
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/dark" component={App1} />
                    <Route component={NoMatch} />
                </Switch>
            </BrowserRouter>
        )}
}

export default RouterJS;