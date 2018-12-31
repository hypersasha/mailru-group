import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './droppable.less';

class Droppable extends Component {
    constructor(props) {
        super(props);

        this.HandleDragEnter = this.HandleDragEnter.bind(this);
        this.HandleDragLeave = this.HandleDragLeave.bind(this);
        this.HandleDragOver = this.HandleDragOver.bind(this);
        this.HandleDrop = this.HandleDrop.bind(this);
    }

    HandleDrop(e) {
        e.preventDefault();

        if (!this.props.isActive) {
            return false;
        }

        // Get dropped file
        let dt = e.dataTransfer;
        let files = dt.files;

        if (this.props.onDrop) {
            this.props.onDrop(files);
        }
    }

    HandleDragOver(e) {
        e = e || window.event;
        if (e.preventDefault) { e.preventDefault(); }

        if (!this.props.isActive) {
            return false;
        }

        if (this.props.onDragOver) {
            this.props.onDragOver(e);
        }
    }

    HandleDragEnter(e) {
        e = e || window.event;
        if (e.preventDefault) { e.preventDefault(); }

        if (!this.props.isActive) {
            return false;
        }

        if (this.props.onDragEnter) {
            this.props.onDragEnter(e);
        }
    }

    HandleDragLeave(e) {
        e = e || window.event;
        if (e.preventDefault) { e.preventDefault(); }

        if (!this.props.isActive) {
            return false;
        }

        if (this.props.onDragLeave) {
            this.props.onDragLeave(e);
        }
    }

    render() {
        return (
            <div className={"droppable " + (this.props.className ? this.props.className : "") + (this.props.isActive ? " active" : " disabled")}
                 onDragEnter={this.HandleDragEnter}
                 onDragOver={this.HandleDragOver}
                 onDragLeave={this.HandleDragLeave}
                 onDrop={this.HandleDrop}>
                {this.props.children}
            </div>
        )
    }
}

Droppable.defaultProps = {
    isActive: true
};

Droppable.propTypes = {
    className: PropTypes.string,
    onDragEnter: PropTypes.func,
    onDrop: PropTypes.func,
    isActive: PropTypes.bool
};

export default Droppable;