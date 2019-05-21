import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from '../../lib/classNames';
import './layout.less';

class Layout extends Component {

    render() {

        const elementStyle = {
            maxWidth: this.props.maxWidth,
            ...this.props.style
        };

        return (
            <div className={classNames("ib-layout",  this.props.className, {
                ['dark-theme']: this.props.theme === 'dark'
            })} style={elementStyle}>
                {this.props.children}
            </div>
        )
    }
}

Layout.propTypes = {
    maxWidth: PropTypes.string,
    theme: PropTypes.oneOf(['dark', 'light'])
};

Layout.defaultProps = {
    maxWidth: "100%",
    theme: 'light'
};

export default Layout;