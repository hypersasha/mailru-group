/**
 * Created by style
 * 23.07.2019
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './scrollView.less';
import classNames from "../../lib/classNames";

class ScrollView extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onScroll = this.onScroll.bind(this);
        this.onWheel = this.onWheel.bind(this);

        this.scrollRef = React.createRef();
        this.scrollContainer = React.createRef();
    }

    componentDidMount() {
        if (this.scrollRef && this.scrollRef.current) {
            if (this.scrollRef.current.addEventListener) {
                if ('onwheel' in document) {
                    // IE9+, FF17+, Ch31+
                    this.scrollRef.current.addEventListener("wheel", this.onWheel, {passive: true});
                } else if ('onmousewheel' in document) {
                    // устаревший вариант события
                    this.scrollRef.current.addEventListener("mousewheel", this.onWheel, {passive: true});
                } else {
                    // Firefox < 17
                    this.scrollRef.current.addEventListener("MozMousePixelScroll", this.onWheel, {passive: true});
                }
            } else { // IE8-
                this.scrollRef.current.attachEvent("onmousewheel", this.onWheel);
            }
        }
    }

    componentWillUnmount() {
        this.scrollRef.removeAllListeners();
    }

    onScroll(e) {
        console.log(e.target.scrollLeft + ' - ' + this.scrollContainer.current.scrollWidth);
    }

    onWheel(e) {
        e = e || window.event;

        // wheelDelta не дает возможность узнать количество пикселей
        let delta = e.deltaY || e.detail || e.wheelDelta;

        let elem = this.scrollRef.current;
        if (this.props.horizontal && ((elem.scrollWidth > elem.scrollLeft + elem.offsetWidth) || delta < 0)) {
            let scrollLeft =  elem.scrollLeft + delta;
            if (elem.scrollTo) {
                elem.scrollTo(scrollLeft, 0);
            } else {
                elem.scrollLeft = scrollLeft;
            }
        }
    }

    render() {
        const {horizontal, children, style, ...restProps} = this.props;
        let scrollItems = children.map((item) => {
            return <div className={"scrollItem"} key={'si-' + Math.random()*10000}>{item}</div>
        });
        return (
            <div className={classNames("ScrollView", {
                ['horizontal']: horizontal
            })} style={style}
                 ref={this.scrollRef}
                 onScroll={this.onScroll}>
                <div className="scrollContainer" ref={this.scrollContainer}>
                    {scrollItems}
                </div>
            </div>
        );
    }
}

ScrollView.propTypes = {
    horizontal: PropTypes.bool
};

ScrollView.defaultProps = {
    horizontal: false
};

export default ScrollView;

