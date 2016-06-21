import React, { Component } from 'react'
// import '../../../stylesheets/partials/modules/Answer.scss';

class Answer extends Component {

    render(){
        return (
            <div className="accountAnswer">
                <div className="question">
                    <div className="head">
                        <img src={require('../../../images/head.jpg')} />
                        <span className="name">奥特曼</span>
                        <span className="price">￥ 5.2</span>
                    </div>
                    <div className="stem">陈老师，长得太帅总是被爱怎么办，有么有什么解决办法</div>
                    <div className="time">15分钟之前</div>
                </div>
            </div>
        )
    }
}

export default Answer;