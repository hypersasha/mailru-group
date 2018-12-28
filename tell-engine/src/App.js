import React, {Component} from 'react';
import './App.css';
import {platform, IOS} from './lib/platform';

const osname = platform();
import StatusBar from './components/StatusBar/StatusBar';
import TextArea from "./components/TextArea/TextArea";

class App extends Component {
    render() {
        return (
            <div className="App">
                <StatusBar/>
                <br/>
                <div className="expo">
                    <p className={"docTip"}>Пример простейшего поля ввода. Компонент TextArea.</p>
                    <TextArea style={{maxHeight: 150, minHeight: 44}}
                              defaultValue={"Кто проживает на дне океана?"}
                              initialHeight={58}
                              grow={true}
                              onChange={(e) => { console.log(e.target.value) }}
                              className={"revenge"} // from App.css
                              placeholder={"Пример поля ввода..."}/>
                </div>
            </div>
        );
    }
}

export default App;
