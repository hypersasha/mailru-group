import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './avatar.less';
import cat_image from './assets/male_cat.png';

class Avatar extends Component{

    render() {
        return (
            <div className={"avatar " + this.props.className ? this.props.className : ''}>
                <div className="avatar-container" style={{
                    backgroundImage: "url(" + this.props.image + ")",
                    backgroundPosition: this.props.imagePosition,
                    borderRadius: this.props.radius,
                    width: this.props.size,
                    height: this.props.size
                }}></div>
            </div>
        )
    }
}

Avatar.defaultProps = {
    size: 48,
    radius: "50%",
    imagePosition: "top center",
    image: cat_image
};
Avatar.propTypes = {
    size: PropTypes.number,
    radius: PropTypes.string,
    backgroundPosition: PropTypes.string,
    image: PropTypes.string,
    className: PropTypes.string
};

export default Avatar;


