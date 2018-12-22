import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './test.less'; // Testing less files to compile and build.
import { platform, IOS } from './lib/platform';
const osname = platform();
import StatusBar from './components/StatusBar/StatusBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StatusBar/>
      </div>
    );
  }
}

export default App;
