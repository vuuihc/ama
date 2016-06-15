/**
 * create by wuwq
 */
import React, { Component } from 'react';
import '../../stylesheets/partials/modules/Account.scss';

class Account extends Component {
    render() {
        return(
            <div id="accountIndex">
                <div className="head">
                    <div className="headOuter">
                        <img src={require("../../images/head.jpg")}/>
                    </div>
                </div>
                <div className="name">倪龙云</div>
                <div className="position">浩瀚科技 CEO</div>
                <div className="description">欢迎咨询有关创业、投资、互联网等方面问题</div>
                <div className="divider top"></div>
                <div className="statics">
                    <ul>
                        <li>23题</li>
                        <li>3000次</li>
                        <li>￥293848</li>
                    </ul>
                    <ul>
                        <li>回答过</li>
                        <li>被偷听</li>
                        <li>身价</li>
                    </ul>
                </div>
                <div className="dividerWide"></div>
                <div className="nav">
                    <ul>
                        <li className="active">听过的</li>
                        <li>我问的</li>
                        <li>问我的</li>
                    </ul>
                </div>
                <div className="container">
                    
                </div>
            </div>
        )
    }
}
export default Account;