import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './filePicker.less';

class FilePicker extends Component {
    constructor(props) {
        super(props);

        this.maxSize = this.props.size || FilePicker.defaultProps.size;
        this.inputRef = React.createRef();
        this.HandleClick = this.HandleClick.bind(this);
        this.HandleFileChange = this.HandleFileChange.bind(this);
    }

    get files() {
        return this.state.files;
    }

    HandleClick() {
        this.inputRef.current.click();
    }

    HandleFileChange(e) {
        let files = e.target.files;
        let largeFiles = [];
        for (let index = 0; index < files.length; index++) {
            if (files[index].size > this.maxSize) {
                largeFiles.push(index);
            }
        }

        // If there are some large files,
        // clear input.
        if (largeFiles.length > 0) {
            this.inputRef.current.value = "";
            if (this.props.onSizeExceeded) {
                this.props.onSizeExceeded(this.maxSize / 1024 / 1024);
            }
            return false;
        }

        this.setState({
            inputFiles: files
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(files);
            }
        });
    }

    render() {
        const {className} = this.props;
        let pickerClass = (className ? className : FilePicker.defaultProps.className);

        return (
            <div className={pickerClass}>
                <div className={pickerClass + "-button"} onClick={this.HandleClick}>UPLOAD FILE</div>
                <input className={"filePicker-input"}
                       multiple={true}
                       ref={this.inputRef}
                       type={"file"} name={this.props.name || FilePicker.defaultProps.name}
                       onChange={this.HandleFileChange}/>
            </div>
        )
    }
}

FilePicker.defaultProps = {
    size: 5242880,
    name: "uploaded-file",
    className: "filePicker"
};

FilePicker.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    onSizeExceeded: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string
};


export default FilePicker;