import React, {Component} from 'react';
import {platform, IOS} from './lib/platform';
const osname = platform();

import './App.css'; // This is IMPORTANT import.
import './test.less'
import Button from "./components/Button/Button";
import Dots from "./components/Dots/Dots"; // Delete this on production.

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonPressed: false,
            pressCount: 0,
            themes: ['green-apple', 'veronika', 'royal-blue', 'mustard', 'indigo']
        };

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        console.log('LOG!');
        if (!this.state.buttonPressed) {
            this.setState(prevState => ({
                buttonPressed: true
            }), () => {
                setTimeout(() => {
                    this.setState(prevState => ({
                        themes: prevState.themes.concat(prevState.themes.shift()),
                        buttonPressed: false
                    }))
                }, 800);
            });
        }
    };

    render() {
        return (
            <div className="App">
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <img src="https://cdn.dribbble.com/users/85713/screenshots/3775213/herbal_dribble.gif" width={200} alt="Green Tea"/>
                    <h1>Заварилось!</h1>
                    <p style={{textAlign:'center', padding: '0 12px'}}>
                        Если Вы видите этот экран, значит все <b>заварилось</b> успешно! Пока что здесь есть только эта замечательная зеленая кнопка.
                    </p>
                    <Button
                        size={"large"}
                        align={"center"}
                        disabled={false}
                        style={{margin: "0 12px"}}
                        onClick={this.handlePress}
                        loading={this.state.buttonPressed}
                        theme={this.state.themes[this.state.pressCount]}
                        before={<i className="material-icons">
                            thumb_up
                        </i>}>
                        Нажать
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
