import React from 'react';
import {message} from "../util/weui/toast1"
import ReactDom from 'react-dom'
class Test extends React.Component{
    constructor(){
        super();
        this.state = {
            show : true
        }
    }
    componentDidMount(){
        message();
    }
    render(){
        return(
            <div>test</div>
        )
    }
}
export default Test;