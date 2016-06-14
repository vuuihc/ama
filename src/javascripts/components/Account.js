/**
 * create by wuwq
 */
import React, { Component } from 'react';
import '../../stylesheets/partials/modules/Account.scss';

class Account extends Component {
    render() {
        return(
            <div id="accountIndex">
                <div className="headOuter">
                    <img src={require("../../images/head.jpg")}/>
                </div>
                <div className="name">倪龙云</div>
                <div className="position">浩瀚科技 CEO</div>
                <div className="description">欢迎咨询有关创业、投资、互联网等方面问题</div>
            </div>
        )
    }
}
export default Account;