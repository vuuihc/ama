import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/IAskedList.scss';

class IAskedList extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="iAskedList">
                {
                    this.props.iAsked.data.length ? (
                        <ul >
                            <li>
                                列表
                            </li>
                        </ul>
                    ):(
                        <div>
                            <div className="hint">
                                你还没有问过呦~
                            </div>
                            <div className="go">
                                快去找<Link to="/tutor">导师</Link>帮你解决问题吧~
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default IAskedList;
