import React, {Component} from 'react';
import PropTypes from 'prop-types';


import classNames from '../../lib/classNames';
import {getSupportedEvents, touchEnabled} from "../../lib/touch";

const events = getSupportedEvents();
const CLEAR_DELAY = 800;

import './touch.less';

export default class Touch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            released: true
        };
        this.container = React.createRef();
        this.clearAnimInterval = null;

        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onMove = this.onMove.bind(this);

    }

    subscribe() {
        this.container.current.addEventListener(events[0], this.onStart);
        this.container.current.addEventListener(events[1], this.onMove);
        this.container.current.addEventListener(events[2], this.onStop);
    }

    unsubscribe() {
        this.container.current.removeEventListener(events[0], this.onStart);
        this.container.current.removeEventListener(events[1], this.onMove);
        this.container.current.removeEventListener(events[2], this.onStop);
    }

    onStart(e) {
        if (!this.props.disabled) {
            if (this.props.onStart) {
                this.props.onStart();
            }

            this.setState({
                pressed: true
            });
        }
    }

    onStop(e) {
        if (!this.props.disabled) {
            if (this.props.onEnd) {
                this.props.onEnd();
            }

            setTimeout(() => {
                this.setState({
                    pressed: false
                });
            }, CLEAR_DELAY)
        }
    }

    onCancel(e) {
    }

    onMove(e) {
        e.stopPropagation();
        this.setState({
            pressed: false
        });
    }

    componentDidMount() {
        touchEnabled && this.subscribe();
    }

    componentWillUnmount() {
        touchEnabled && this.unsubscribe();
    }

    render() {
        const {className, ...restProps} = this.props;
        const {pressed} = this.state;
        return (
            <div className={"tappable-container"}>
                <div {...restProps}
                     className={classNames(className, 'tappable', {['tapped']: pressed})}
                     ref={this.container}
                     style={{overflow: "visible", position: "relative"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Touch.propTypes = {
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
    disabled: PropTypes.bool
};

