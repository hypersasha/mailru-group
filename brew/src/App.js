import React, {Component} from 'react';
import {platform, IOS, iPhone} from './lib/platform';
import Title from "./components/Title/Title";
import Layout from "./components/Layout/Layout";
import Avatar from "./components/Avatar/Avatar";
import Switch from "./components/Switch/Switch";

// Import your styles after all components!
import './test.less'
import Paragraph from "./components/Paragraph/Paragraph";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            darkTheme: false
        };

        this.changeTheme = this.changeTheme.bind(this);
    }

    changeTheme() {
        this.setState(prevState => ({
            darkTheme: !prevState.darkTheme
        }))
    }

    render() {
        return (
            <div className="App">
                <Layout theme={this.state.darkTheme ? "dark" : 'light'} className={'welcome-layout'}>
                    <Layout maxWidth={'720px'} className={'welcome-layout--inner'}>
                        <Title
                            before={<Avatar size={64} image={'https://cdn.dribbble.com/users/85713/screenshots/3775213/herbal_dribble.gif'} />}
                        >Заварилось</Title>
                        <Paragraph>
                            Добро пожаловать в Instant Brew! Если Вы видите эту демо-страницу, значит, проект успешно
                            собрался и всё заварилось. Приступайте к работе с редактирования файла <b>App.js</b> и
                            сделайте это приложение лучшим в мире.
                        </Paragraph>
                     <Switch label={"Темная тема"} isActive={this.state.darkTheme} onSwitch={this.changeTheme} />
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;
