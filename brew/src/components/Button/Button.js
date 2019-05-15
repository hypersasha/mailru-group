import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Touch from "../Touch/Touch";

import classNames from '../../lib/classNames';
import './button.less';
import Dots from "../Dots/Dots";

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            loading: props.loading
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (!this.props.disabled && !this.props.loading) {
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
    }

    render() {

        const {style,
            theme,
            level,
            size,
            loading,
            disabled,
            onClick,
            align, ...restProps} = this.props;

        return (
            <Touch {...restProps} disabled={loading || disabled} onClick={this.handleClick} className={classNames('ib-tappable', `ib-${size}`, {
                ['ib-align-center']: align === 'center',
                ['ib-align-right']: align === 'right'
            })}>
                <div style={style} className={classNames('instant-button', 'gradient-' + theme, `ib-${size}`, {
                    [`flat-${theme}`]: level === 'secondary',
                    ['disabled']: disabled,
                    ['loading']: loading
                })}>
                    <div className={classNames('button-content', `ib-${size}`, {
                        ['mustard-color']: theme === 'mustard',
                        [`flat-${theme}-text`]: level === 'secondary',
                        ['invisible']: this.props.loading
                    })}>
                        <div className={classNames('before', {[`second-level`]: level === 'secondary'})}>
                            {this.props.before}
                        </div>
                        {this.props.children}
                        <div className={classNames('after', {[`second-level`]: level === 'secondary'})}>
                            {this.props.after}
                        </div>
                    </div>
                    {this.props.loading && <Dots theme={theme === 'mustard' ? 'dark' : 'light'} />}
                </div>
            </Touch>
        );
    }
}

Button.propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    theme: PropTypes.oneOf(['royal-blue', 'veronika', 'mustard', 'green-apple', 'clear-sky', 'indigo']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    after: PropTypes.any,
    before: PropTypes.any,
    level: PropTypes.oneOf(['primary', 'secondary']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool
};

Button.defaultProps = {
    level: 'primary',
    align: 'left',
    theme: 'green-apple',
    size: 'large',
    disabled: false,
    loading: false
};

export default Button;