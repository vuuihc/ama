/**
 * Created by jf on 15/10/27.
 */



import React, {Component} from 'react';
import classNames from 'classnames';

class Mask extends Component {
    
    render() {
        const {transparent, ...others} = this.props;
        const className = classNames({
            'weui_mask': !transparent,
            'weui_mask_transparent': transparent
        });

        return (
            <div className={className} {...others}></div>
        );
    }
}
Mask.propTypes = {
    transparent: React.PropTypes.bool
};
Mask.defaultProps = {
    transparent: false
};

export default Mask;