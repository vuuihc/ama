import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/AskedMeList.scss';
import Modal from '../Modal';
import { connect } from 'react-redux'
import { getAskedMe } from '../../actions/account'
class AskedMeList extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        this.props.getAskedMe(1, 2);
    }
    render(){
        return (
            <div className="askedMeList">
                {
                    this.props.data.length ? (
                        <ul >
                            <li>
                                {/*this.props*/}
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
                            <button className="becomeTutor" onClick={(e)=>{
                            console.log(this);
                            }}>
                                成为导师
                            </button>
                            <Modal ref="modal"/>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.account.askedMe.loading,
        data: state.account.askedMe.data
    }
}

AskedMeList = connect(mapStateToProps, { getAskedMe })(AskedMeList);

export default AskedMeList;
