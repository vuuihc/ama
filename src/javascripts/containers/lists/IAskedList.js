import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/IAskedList.scss';
import QuestionItemWithoutAvatar from '../blocks/QuestionItemWithoutAvatar';
import QuestionItemWithoutAvatarNotAnswered from '../blocks/QuestionItemWithoutAvatarNotAnswered';

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
                                {
                                    this.props.iAsked.data.map((item, index)=>{
                                        switch(item.isanswered){
                                            case '0':
                                                return <QuestionItemWithoutAvatarNotAnswered key={index} question={item}/>;
                                            case '1':
                                                return <QuestionItemWithoutAvatar key={index} question={item}/>;
                                            default:
                                                console.log("这个问题有问题", item);
                                                return '';
                                        }
                                    })
                                }
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
