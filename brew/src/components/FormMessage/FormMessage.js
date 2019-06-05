import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "../../lib/classNames.js";

import "./formMessage.less";

class FormMessage extends Component {
    render() {
        const { children, error, info, ...restProps } = this.props;
        return (
            <p className={classNames("ib-formMessage", {
                ['error']: error,
                ['info']: info
            })}>
                {children}
            </p>
    );
    }
}

FormMessage.propTypes = {
    error: PropTypes.bool,
    info: PropTypes.bool
};

FormMessage.defaultProps = {
    error: false,
    info: false
};

export default FormMessage;