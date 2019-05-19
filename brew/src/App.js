import React, {Component} from 'react';
import {platform, IOS, iPhone} from './lib/platform';
import './test.less'
import Button from "./components/Button/Button";
import Title from "./components/Title/Title";
import Touch from "./components/Touch/Touch";
import StatusBar from "./components/StatusBar/StatusBar";

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
                    <img src="https://cdn.dribbble.com/users/85713/screenshots/3775213/herbal_dribble.gif"
                         width={200}
                         style={{marginBottom: 20}}
                         alt="Green Tea"/>
                    <Title align={"center"}>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <i style={{color: "var(--hyper-green)"}} className="material-icons">favorite_border</i>
                            <h1 style={{marginLeft: 6}}>Заварилось!</h1>
                        </div>
                    </Title>
                    <p style={{textAlign: 'center', padding: '0 12px'}}>
                        Если Вы видите этот экран, значит все <b>заварилось</b> успешно! Пока что здесь есть только эта
                        замечательная зеленая кнопка.
                    </p>
                    <Button
                        style={{margin: "0 12px"}}
                        onClick={this.handlePress}
                        before={<i className="material-icons">accessible_forward</i>}
                        loading={this.state.buttonPressed}
                        theme={this.state.themes[this.state.pressCount]}>
                        Нажать
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
