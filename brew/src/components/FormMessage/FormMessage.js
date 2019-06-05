import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "../../lib/classNames.js";

import "./formMessage.less";

class FormMessage extends Component {
    render() {
        const { children, error, ...restProps } = this.props;
        return (
            <p className={classNames("ib-formMessage", {
                ['error']: error,
            })}>
                {children}
            </p>
    );
    }
}

FormMessage.propTypes = {
    error: PropTypes.bool
};

FormMessage.defaultProps = {
    error: false,
};

export default FormMessage;