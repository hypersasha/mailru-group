import React, {Component} from 'react';

import './rayon-search.less';

const rayons = ["Сормовский", "Ленинский", "Нижегородский", "Автозаводский"];

class RayonSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosen: "Нижегородский"
        }
    }

    HandleRayonChange(rayon) {
        this.setState((prevState) => ({
            chosen: rayon
        }))
    }

    render() {

        let listItems = rayons.map((number) =>
            <div className={"RayonSearch-List-Item" + (number === this.state.chosen ? " Active" : "")}
                 key={number.toString()}
                 onClick={() => {this.HandleRayonChange(number)}}>{number}</div>
        );

        return (
            <div className={"RayonSearch"}>
                <div className={"RayonSearch-Header"}>Район поиска</div>
                <div className={"RayonSearch-List"}>{listItems}</div>
            </div>
        )
    }
}

export default RayonSearch