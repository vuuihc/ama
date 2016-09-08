import React from 'react';
import Toast from './toast';
import Alert from './alert';
import ReactDom from 'react-dom'
class Alert1 extends React.Component{
    constructor(){
        super();
        this.hideAlert = this.hideAlert.bind(this);
        this.state = {
            showAlert : true,
            buttons: [
                {
                    type:"default",
                    label:"确定",
                    onClick:this.hideAlert
                }
            ]
        }
    }
    hideAlert(){
        this.setState({showAlert:false});
        if(typeof this.props.onClose == 'function') this.props.onClose();
    }
    render(){
        return(
            <Alert show={this.state.showAlert} title="提示" buttons={this.state.buttons}>{this.props.content}</Alert>
        )
    }
}
class Toast1 extends React.Component{
    constructor(){
        super();
        this.state = {
            show : true
        }
    }
    componentDidMount(){
        console.log(this.props);
        setTimeout(()=>{
            this.setState({show:false});
            console.log(this.props);
            if(typeof this.props.onClose == 'function') this.props.onClose()
        },this.props.duration * 1000);
    }
    render(){
        return(
            <Toast show = {this.state.show} children = {this.props.content}/>
        )
    }
}



let message = {};
message.success = (content, duration  = 1, onClose ) => {
    let div = document.createElement('div');
    div.id = 'message-success';
    document.body.appendChild(div);
    ReactDom.render(React.createElement(Toast1, { content: content, onClose:onClose, duration: duration}), div);
}
message.alert =(content, onClose) => {
    let div = document.createElement('div');
    div.id = 'message-alert';
    document.body.appendChild(div);
    ReactDom.render(React.createElement(Alert1, { content: content, onClose:onClose}), div);
}

export default message;
