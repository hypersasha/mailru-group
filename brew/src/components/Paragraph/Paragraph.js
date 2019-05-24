import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "../../lib/classNames.js";

import "./paragraph.less";

class Paragraph extends Component {
    render() {
        const { children, textAlign, wide, big, small, ...restProps } = this.props;
        return (
            <p className={classNames("ib-paragraph", textAlign, {
                ['wide']: wide,
                ['big']: big,
                ['small']: small
            })}>
                {children}
            </p>
    );
    }
}

Paragraph.propTypes = {
    textAlign: PropTypes.oneOf(['left', 'center', 'right']),
    wide: PropTypes.bool,
    big: PropTypes.bool,
    small: PropTypes.bool
};

Paragraph.defaultProps = {
    textAlign: 'left',
    wide: false,
    big: false,
    small: false
};

export default Paragraph;