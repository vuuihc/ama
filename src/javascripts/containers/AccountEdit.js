/**
 * Created by zhushihao on 2016/6/24.
 */
import React, {Component, PropTypes} from 'react'
import {browserHistory, withRouter} from 'react-router'
import {baseUrl} from '../api/config'
import {connect} from 'react-redux'
import {editUserInfo} from '../actions/account';
import Alert from "../util/weui/alert"
import message from "../util/weui/message"
import '../../stylesheets/partials/modules/AccountEdit.scss'

class AccountEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.userInfo.user_company,
      job: this.props.userInfo.user_position,
      experience: this.props.userInfo.user_experience,
      introduction: this.props.userInfo.user_introduction,
      teacher_prize: this.props.userInfo.teacher_prize,
      showAlert:false,
      alertContent:"",
      alert:{
        title:"提示",
        buttons:[
          {
            type:"default",
            label:"确定",
            onClick:this.hideAlert.bind(this)
          }
        ]
      },
      canLeave:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.routerWillLeave = this.routerWillLeave.bind(this);
  }
  hideAlert(){
    this.setState({showAlert:false})
  }
  routerWillLeave(nextLocation) {
    // return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    const self = this
	if(nextLocation.state == 'okay'){
		return true;
	}
    const now = this.state;
    const previous = this.props.userInfo;
    if(!this.state.canLeave &&(now.company != previous.user_company || now.job != previous.user_position || now.introduction != previous.user_introduction)){
      message.confirm('您所编辑的页面尚未保存，确认离开?',"接着编辑","放弃修改",
        ()=>{
            self.setState({canLeave:false})
        },
        ()=>{
            browserHistory.push(nextLocation.pathname)
        }
      )
      return false
    }
  }
  componentDidMount() {
    // const {id} = this.props.params
    // this.props.dispatch((id))
    console.log("questionInfo===" + this.props.tutorInfo)
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
  }

  handleSubmit() {
    if(!(/^[1-9]+[0-9]*]*$/).test(this.state.teacher_prize)){
        this.setState({alertContent:'请在"提问价格"中填入整数',showAlert:true})
        return
    }
    this.props.editUserInfo(this.state.company, this.state.job, this.state.experience, this.state.teacher_prize,this.state.introduction);
    browserHistory.push({pathname:baseUrl + "account/IAskedList", state:'okay'});
  }

  render() {
    const {userInfo} = this.props;
    return (
      <main className="user edit">
        <Alert show={this.state.showAlert} title="提示" buttons={this.state.alert.buttons}>{this.state.alertContent}</Alert>
        <div className="user-card-bg">
          <img src={userInfo.user_face.slice(0, -1) + '132'}/>
        </div>
        <div className="user-card">
          <img className="avatar" src={userInfo.user_face.slice(0, -1) + '132'}/>
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
            <label>职  业/年  级：</label>
            <input
              placeholder="输入您的职业类型"
              value={this.state.job}
              onChange={(e)=>{this.setState({job: e.target.value})}}
            />
          </div>
          {userInfo.is_teacher?
          <div className="form-group">
            <label>提 问 价 格：</label>
            <input
              type="number"
              placeholder="输入您的提问价格"
              value={this.state.teacher_prize}
              onChange={(e)=>{this.setState({teacher_prize: e.target.value})}}
            />
          </div>:""}
          <div className="form-group self-intro-text">
            <label>您  的 介  绍： </label>
            <div className="count">{this.state.introduction.length} / 100</div>
            <textarea
              placeholder="写点什么让大家更了解你吧~"
              value={this.state.introduction}
              onChange={(e)=>{
                  if(e.target.value.length < 101 || e.target.value.length - this.state.introduction.length < 0){
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
AccountEdit = withRouter(AccountEdit)

function mapStateToProps(state) {
  return {
    userInfo: state.account.userInfo
  }
}

export default connect(
  mapStateToProps, {editUserInfo}
)(AccountEdit)
