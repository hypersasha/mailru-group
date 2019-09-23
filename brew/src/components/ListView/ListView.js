/**
 * Created by Starcat
 * 22.09.2019
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ListView extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {data, ...restProps} = this.props;
        const Wrapper = restProps.wrapper;

        let listItems = data.map(item => {
            if (Wrapper) {
                const {key, ...restItem} = item;
                return <Wrapper key={key || "listItem-" + Math.random()*100000} {...restItem} />;
            }
        });

        return (
            <div className={'listView'}>
                {listItems}
            </div>
        );
    }
}

ListView.defaultProps = {
    data: []
};

ListView.propTypes = {
    wrapper: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object)
};

export default ListView;