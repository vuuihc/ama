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
        setTimeout(()=>{this.setState({show:false})},1500);
    }
    render(){
        return(
            <Toast show = {this.state.show}/>
        )
    }
}


export const message = () => {
    var div = document.createElement('div');
    document.body.appendChild(div);
    ReactDom.render(React.createElement(Toast1), document.getElementById('root'));
}

