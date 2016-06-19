import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/AskedMeList.scss';

class AskedMeList extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="askedMeList">
                {
                    this.props.askedMeData.length ? (
                        <ul >
                            <li>
                                {this.props}
                            </li>
                        </ul>
                    ):(
                        <div>
                            <div className="hint">
                                您还不是导师哦~
                            </div>
                            <div className="email">
                                发送个人简历到renzheng@7dyk.com
                            </div>
                            <div className="next">
                                审核通过后我们会以邮件的形式发放邀请码
                            </div>
                            <button className="becomeTutor">
                                成为导师
                            </button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default AskedMeList;
