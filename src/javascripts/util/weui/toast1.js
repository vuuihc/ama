import React from 'react';
import Toast from './toast';
import ReactDom from 'react-dom'
class Toast1 extends React.Component{
    constructor(){
        super();
        this.state = {
            show : true
        }
    }
    componentDidMount(){
        setTimeout(()=>{this.setState({show:false}); this.props.onClose()},this.props.duration * 1000);
    }
    render(){
        return(
            <Toast show = {this.state.show} icon={this.props.icon} children = {this.props.content}/>
        )
    }
}



let message = {};
message.success = (content, duration  = 1, onClose) => {
    ReactDom.render(React.createElement(Toast1, {icon: 'weui_icon_success', content: content, onClose:onClose, duration: duration}), document.getElementById('root'));
}
message.info =(content, duration  = 1, onClose) => {
    ReactDom.render(React.createElement(Toast1, {icon: 'weui_icon_info', content: content, onClose:onClose, duration: duration}), document.getElementById('root'));
}
message.cancel = (content, duration  = 1, onClose) => {
    ReactDom.render(React.createElement(Toast1, {icon: 'weui_icon_cancel', content: content, onClose:onClose, duration: duration}), document.getElementById('root'));
}

export default message;
