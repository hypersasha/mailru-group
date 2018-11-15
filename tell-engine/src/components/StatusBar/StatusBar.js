import React, { Component } from 'react';
import { platform, IOS } from '../../lib/platform';
const osname = platform();

import './status-bar.less';

class StatusBar extends Component {
    render() {
        return(
            <div className={`status-bar-${osname}`}></div>
        );
    }
}

export default StatusBar;