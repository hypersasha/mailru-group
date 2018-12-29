import React, {Component} from 'react';
import {platform, IOS} from './lib/platform';
const osname = platform();

import './test.less';
import FilePicker from "./components/FilePicker/FilePicker";

import {XhrFilesUpload} from './lib/Utils';

class App extends Component {

    constructor(props) {
        super(props);
        this.HandleFileChange = this.HandleFileChange.bind(this);
        this.HandleUpload = this.HandleUpload.bind(this);
    }

    HandleFileChange(files) {
        console.log(files);
        this.setState({
            filesToUpload: files
        });
    }

    HandleUpload() {
        XhrFilesUpload(this.state.filesToUpload, "http://localhost:3000/upload", (response) => {
            // On Finished Handler
            console.log(response);
        }, (percentage) => {
            // On Progress Handler
            console.log('Progress: ' + percentage + '%');
        });
    }

    render() {
        return (
            <div className="App">
                <FilePicker
                    className={"brewPicker"}
                    onChange={this.HandleFileChange}
                    onSizeExceeded={(maxSize) => { alert("Max file size is " + maxSize + " MB") }} />
                <button onClick={this.HandleUpload}>Start</button>
                <div className="logo">
                    <img src="https://cdn.dribbble.com/users/85713/screenshots/3775213/herbal_dribble.gif" width={200} alt="Green Tea"/>
                </div>
            </div>
        );
    }
}

export default App;
