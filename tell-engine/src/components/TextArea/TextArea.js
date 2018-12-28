import React, {Component} from 'react';

import PropTypes from 'prop-types';

import './textarea.less';


class TextArea extends Component {
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

        this.HandleFocus = this.HandleFocus.bind(this);
        this.HandleBlur = this.HandleBlur.bind(this);
        this.HandleContentChange = this.HandleContentChange.bind(this);

        this.elementRef = React.createRef();
    }

    componentDidMount () {
        if (this.props.grow) {
            this.Resize();
        }
    }

    get value() { return this.isControlledOutside ? this.props.value : this.state.value }

    /**
     * Auto-resize height of textarea on input.
     * @constructor
     */
    Resize() {
        const el = this.elementRef.current;
        if (el) {
            const {offsetHeight, scrollHeight} = el;
            const style = window.getComputedStyle(el);
            const paddingTop = parseInt(style.paddingTop);
            const paddingBottom = parseInt(style.paddingBottom);

            let diff = paddingTop + paddingBottom;

            if (scrollHeight + diff <= offsetHeight) {
                diff = 0;
            }

            if (el.value) {
                this.setState({ height: scrollHeight - diff });
            }

            this.setState({ height: 0 }, () => {
                const height = el.scrollHeight - diff;

                this.setState({ height });
            });
        }
    }

    /**
     * Triggers on input focus.
     * @constructor
     */
    HandleFocus() {
        this.ChangeFocusState(true);
    }

    /**
     * Triggers on input blur.
     * @constructor
     */
    HandleBlur() {
        this.ChangeFocusState(false);
    }

    /**
     * Changes focus state for current input.
     * @param focus_state True or false.
     * @constructor
     */
    ChangeFocusState(focus_state) {
        this.setState(prevState => ({
            isFocused: focus_state
        }));
    }

    HandleContentChange(e) {
        if (this.props.grow) {
            this.Resize();
        }

        if (!this.isControlledOutside) {
            this.setState({ value: e.target.value });
        }

        // Call user onChange function
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
    }

    render() {
        const {defaultValue, grow, initialHeight, className, style, ...restProps} = this.props;
        const height = this.state.height || initialHeight || 66;
        return (
            <textarea
                className={"textarea" + (className ? " " + className : "")}
                ref={this.elementRef}
                value={this.state.value}
                {...restProps}
                style={{ height, ...style }}
                onChange={this.HandleContentChange}>
            </textarea>
        );
    }
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    grow: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

export default TextArea;