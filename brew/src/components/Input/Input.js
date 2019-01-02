import React, {Component} from 'react';

import PropTypes from 'prop-types';
import './input.less';

class Input extends Component {
    constructor(props) {
        super(props);

        if (typeof props.value !== "undefined") {
            this.isControlledOutside = true;
            this.state = {};
        } else {
            this.state = {
                value: props.defaultValue || ''
            }
        }

        this.HandleChange = this.HandleChange.bind(this);
    }

    HandleChange(e) {
        if (!this.isControlledOutside) {
            if (this.props.maxLength > 0) {
                if (e.target.value.length < this.props.maxLength) {
                    this.setState({value: e.target.value});
                }
            } else {
                this.setState({value: e.target.value});
            }
        }

        // Call user onChange function
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
    }

    /**
     * Returns value of text input.
     * @returns {*|string}
     * @constructor
     */
    get Value() { return this.isControlledOutside ? this.props.value : this.state.value }

    render() {
        const {type, defaultValue, className, ...restProps} = this.props;
        return(
            <input type={type}
                   name={this.props.name}
                   className={"brew-input " + (this.props.className ? this.props.className : "")}
                   onChange={this.HandleChange}
                   {...restProps}
            />
        );
    }
}

Input.defaultProps = {
    placeholder: "Input your text...",
    type: 'text',
    maxLength: -1
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    maxLength: PropTypes.number
};
export default Input;
