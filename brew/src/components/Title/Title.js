import React, {Component} from 'react';

import classNames from '../../lib/classNames';
import PropTypes from 'prop-types';

import './title.less';

const TITLE_ELEMENTS = {
    'title-1': 'h1',
    'title-2': 'h2',
    'title-3': 'h3',
    'title-4': 'h4',
    'category': 'h4',
    'subtitle-1': 'h4',
    'subtitle-2': 'h4'
};

class Title extends Component {

    static getTitleElement(level) {
        return TITLE_ELEMENTS[level] || 'h1';
    }

    render() {

        const {level, align, before, after, ...restProps} = this.props;
        const Component = Title.getTitleElement(level);

        return <div className={classNames('ib-title', align)}>
            <div className="before">{before}</div>
            <div className={classNames('ib-title--content', {
                ['before-enabled']: before,
                ['after-enabled']: after
            })}>
                <Component className={classNames(level)}>{this.props.children}</Component>
            </div>
            <div className="after">{after}</div>
        </div>
    }
}

Title.propTypes = {
    level: PropTypes.oneOf(['title-1', 'title-2', 'title-3', 'title-4', 'category', 'subtitle-1', 'subtitle-2']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    before: PropTypes.any,
    after: PropTypes.any
};

Title.defaultProps = {
    level: 'title-1',
    align: 'left',
    before: null,
    after: null
};

export default Title;