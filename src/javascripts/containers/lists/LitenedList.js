import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/LitenedList.scss';

class LitenedList extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="askMeList">
                {
                    this.props.listenedData.length ? (
                        <ul >
                            <li>
                                <div className="header">入职心仪互联网公司的实际有哪些？</div>
                                <div className="content">
                                    <div className="headInner">
                                        <img src={require('../../../images/head.jpg')}/>
                                    </div>
                                    <div className="answer">
                                    <span className="bubble">
                                        <span className="bubble-tail"></span>
                                        <span className="bubble-voice"></span>
                                        <span className="bubble-text">1元偷偷听</span>
                                    </span>
                                    </div>
                                </div>
                                <div className="innerFooter">
                                    <span className="howManyListen">54人偷听</span>
                                    <span className="howManySorrow">3人觉得亏了</span>
                                </div>
                                <div className="divider"></div>
                            </li>
                            <li>
                                <div className="header">入职心仪互联网公司的实际有哪些？</div>
                                <div className="content">
                                    <div className="headInner"><img src={require('../../../images/head.jpg')}/></div>
                                    <div className="answer">
                                    <span className="bubble">
                                        <span className="bubble-tail"></span>
                                        <span className="bubble-voice"></span>
                                        <span className="bubble-text">1元偷偷听</span>
                                    </span>
                                    </div>
                                </div>
                                <div className="innerFooter">
                                    <div className="howMany"></div>
                                </div>
                                <div className="divider"></div>
                            </li>
                        </ul>
                    ):(
                        <div>
                            <div className="hint">
                                你还没有偷听过呦~
                            </div>
                            <div className="go">
                                快去<Link to="/hot">热门</Link>逛一逛吧~
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default LitenedList;
