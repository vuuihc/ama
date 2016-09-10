import React,{Component} from 'react';
import Toast from './toast';
import Alert from './alert';
import Confirm from "./confirm"
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

class SmartConfirm extends Component{
    constructor(props){
        super(props)
        this.state = {
            showConfirm:true
        }
    }
    confirm(){
        this.setState({showConfirm:false})
        if(typeof(this.props.onConfirm)==="function")
            this.props.onConfirm()
    }
    cancel(){
        this.setState({showConfirm:false})
        if(typeof(this.props.onCancel)==="function")
            this.props.onCancel()
    }
    render(){
        return(
            <Confirm
            buttons={[
                {
                  type:"primary",
                  label: this.props.confirmText,
                  onClick:this.confirm.bind(this)
                },
                {
                  type:"default",
                  label: this.props.cancelText,
                  onClick:this.cancel.bind(this)
                }
            ]}
            title="提示"
            show={this.state.showConfirm}
            >
            {this.props.content}
            </Confirm>
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
message.confirm = (content, confirmText="确定", cancelText="取消",onConfirm, onCancel) => {
    let div = document.createElement("div");
    div.id = 'message-confirm';
    document.body.appendChild(div);
    ReactDom.render(
        <SmartConfirm content={content} onConfirm={onConfirm} onCancel={onCancel} confirmText = {confirmText} cancelText={cancelText} />,
        div
    )
}

export default message;
