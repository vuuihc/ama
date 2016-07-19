/**
 * Created by zhushihao on 2016/6/24.
 */
import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import {baseUrl} from '../api/config'
import { connect } from 'react-redux'
import { editUserInfo } from '../actions/account';
import '../../stylesheets/partials/modules/AccountEdit.scss'

class AccountEdit extends Component{
    constructor(props){
        super(props);
        this.state={
            company:this.props.userInfo.user_company,
            job:this.props.userInfo.user_position,
            experience:this.props.userInfo.user_experience,
            introduction:this.props.userInfo.user_introduction
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        // const {id} = this.props.params
        // this.props.dispatch((id))
        console.log("questionInfo==="+this.props.tutorInfo)
    }
    handleSubmit(){
        this.props.editUserInfo(this.state.company, this.state.job, this.state.experience, this.state.introduction);
        browserHistory.push( baseUrl + "account/IAskedList")
    }
    render() {
        const { userInfo } = this.props;
        return (
            <main className="user edit" >
            <div className="user-card-bg">
                <img src={userInfo.user_face} />
            </div>
            <div className="user-card">
                <img className="avatar" src={userInfo.user_face} />
                <h3 className="name">
                    { userInfo.user_name }
                </h3>
                <div className="form-group">
                <label>工作单位/学校：</label>
                <input
                    placeholder="您所在的公司/学校"
                    value={this.state.company}
                    onChange={(e)=>{this.setState({company: e.target.value})}}
                />
                </div>
                <div className="form-group">
                <label>职   业/年   级：</label>
                <input
                    placeholder="输入您的职业类型"
                    value={this.state.job}
                    onChange={(e)=>{this.setState({job: e.target.value})}}
                />
                </div>
                <div className="form-group self-intro-text">
                <label>您  的   介  绍：<span className="count">{this.state.introduction.length} / 100</span> </label>
                <textarea
                    placeholder="写点什么让大家更了解你吧~"
                    value={this.state.introduction}
                    onChange={(e)=>{
                      if(this.state.introduction.length < 100){
                        this.setState({introduction: e.target.value})
                      }
                    }}
                />
                </div>
                <a className="bottom-btn" onClick={this.handleSubmit}>完成</a>
                </div>
            </main>
        )
    }
}

AccountEdit.propTypes = {
  // tutorInfo: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

function mapStateToProps(state) {
  return {
    userInfo: state.account.userInfo
  }
}

export default connect(
  mapStateToProps, { editUserInfo }
)(AccountEdit)