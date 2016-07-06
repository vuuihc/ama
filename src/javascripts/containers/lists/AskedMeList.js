import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/AskedMeList.scss';
import Modal from '../Modal';
import { connect } from 'react-redux'
import { getAskedMe } from '../../actions/account'
class AskedMeList extends Component{
    constructor(){
        super();
        this.state={
            afford:'',
            inviteCode:''
        }
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
                            <button className="becomeTutor" onClick={(e)=>{this.refs.modal.open()}}>
                                成为导师
                            </button>
                            <Modal left="22" right="330" ref="modal">
                                <div className="invitation">
                                    <span>邀请码</span>
                                    <input
                                        type="text"
                                        className="no-underline"
                                        value={this.state.inviteCode}
                                        placeholder="请输入您的邀请码"
                                        onChange={(e)=>{this.setState({inviteCode:e.target.value})}}
                                    />
                                </div>
                                <div className="afford">
                                    <span>向我提问需要支付</span>
                                    <input
                                        type="text"
                                        width={`${30/75}rem`}
                                        className="no-underline"
                                        value={this.state.afford}
                                        onChange={(e)=>{this.setState({afford:e.target.value})}}
                                    />
                                    <span>元</span>
                                </div>
                                <div className="submit">确定</div>
                            </Modal>
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
