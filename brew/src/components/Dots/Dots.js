import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './dots.less';
import classNames from '../../lib/classNames';

class Dots extends Component {

    render() {
        return(
            <div className="wave-dots" style={{ background: (this.props.tint ? 'rgba(0,0,0,0.5)' : 'transparent') }}>
                <div className="wave">
                    <span className={classNames('dot', {['dark']: this.props.theme === 'dark'})} />
                    <span className={classNames('dot', {['dark']: this.props.theme === 'dark'})} />
                    <span className={classNames('dot', {['dark']: this.props.theme === 'dark'})} />
                </div>
            </div>
        )
    }
}

Dots.propTypes = {
    theme: PropTypes.oneOf(['dark', 'light']),
    tint: PropTypes.bool
};

Dots.defaultProps = {
    theme: 'light',
    tint: false
};

export default Dots;