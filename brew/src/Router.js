import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";

class AppRouter extends Component {
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path={'/'} component={App} />
                    <Route path={'/help'} component={App} />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;