/**
 * Created by jf on 15/10/27.
 */



import React from 'react';
import classNames from 'classnames';
import Mask from './mask';
import "./weui_mask.css"
import "./weui_dialog.scss"

class Alert extends React.Component {

    _renderButtons() {
        return this.props.buttons.map((action, idx) => {
            const {type, label, ...others} = action;
            const className = classNames({
                weui_btn_dialog: true,
                default: type === 'default',
                primary: type === 'primary'
            });

            return (
                <a key={idx} href="javascript:;" {...others} className={className}>{label}</a>
            );
        });
    }

    render() {
        const {title, show, children} = this.props;
        return (
            <div className="weui_dialog_alert" style={{display: show ? 'block' : 'none'}}>
                <Mask/>
                <div className="weui_dialog">
                    <div className="weui_dialog_hd">
                        <strong className="weui_dialog_title">{title}</strong>
                    </div>
                    <div className="weui_dialog_bd">
                        {children}
                    </div>
                    <div className="weui_dialog_ft">
                        {this._renderButtons()}
                    </div>
                </div>
            </div>
        );
    }
}

Alert.propTypes = {
  buttons: React.PropTypes.array,
  show: React.PropTypes.bool,
  title: React.PropTypes.string
};

Alert.defaultProps = {
  buttons: [],
  show: false,
  title: ''
};

export default Alert;