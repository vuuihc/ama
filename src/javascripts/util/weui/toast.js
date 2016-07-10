/**
 * Created by jf on 15/10/27.
 */



import React ,{Component}from 'react';
import classNames from 'classnames';
import Mask from './mask';
import Icon from './icon';
import "./weui_mask.css"
import "./weui_toast.css"
import "./weui_icon_font.css"

class Toast extends Component {
    render() {
        const {icon, show, children, iconSize} = this.props;

        return (
            <div className={icon === 'loading' ? 'weui_loading_toast' : ''} style={{display: show ? 'block' : 'none'}}>
                <Mask transparent={true}/>
                <div className="weui_toast">
                    <Icon value={icon} size={iconSize}/>
                    <p className="weui_toast_content">{children}</p>
                </div>
            </div>
        );
    }
}
Toast.propTypes = {
    icon: React.PropTypes.string,
    iconSize: React.PropTypes.string,
    show: React.PropTypes.bool
};

Toast.defaultProps = {
    icon: 'toast',
    show: false
};

export default Toast;